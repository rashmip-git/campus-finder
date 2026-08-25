const Item = require("../models/Item");

const {
    calculateSimilaritySignals,
    calculateMatchScore
} = require("./scoringService");

/**
 * Find opposite-status candidates.
 *
 * Lost  -> Found
 * Found -> Lost
 */
async function findCandidateItems(newItem) {
    if (!newItem || !newItem.status) {
        throw new Error("New item with a valid status is required.");
    }

    let oppositeStatus;

    if (newItem.status === "Lost") {
        oppositeStatus = "Found";
    } else if (newItem.status === "Found") {
        oppositeStatus = "Lost";
    } else {
        return [];
    }

    return Item.find({
        status: oppositeStatus
    }).sort({
        createdAt: -1
    });
}

/**
 * Generate ranked match candidates for a new item.
 */
async function findRankedMatches(newItem) {
    const candidates = await findCandidateItems(newItem);

    const matches = [];

    for (const candidate of candidates) {
        try {
            const signals =
                await calculateSimilaritySignals(
                    newItem,
                    candidate
                );

            const score =
                calculateMatchScore(signals);

            matches.push({
                item: candidate,
                score,
                signals
            });
        } catch (error) {
            console.error(
                `Failed to score candidate ${candidate._id}:`,
                error.message
            );
        }
    }

    matches.sort((a, b) => b.score - a.score);

    return matches;
}

module.exports = {
    findCandidateItems,
    findRankedMatches
};