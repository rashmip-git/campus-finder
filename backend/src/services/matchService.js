const Match = require("../models/Match");

/**
 * Save ranked matching results for a newly uploaded item.
 *
 * The first result gets rank 1,
 * the second gets rank 2, and so on.
 */
async function saveMatches(newItem, rankedMatches) {
    if (!newItem || !newItem._id) {
        throw new Error("A valid new item is required.");
    }

    if (!Array.isArray(rankedMatches)) {
        throw new Error("Ranked matches must be an array.");
    }

    const matchDocuments = rankedMatches.map(
        (match, index) => ({
            newItem: newItem._id,

            candidateItem: match.item._id,

            score: match.score,

            signals: {
                textSimilarity:
                    match.signals.textSimilarity ?? 0,

                imageSimilarity:
                    match.signals.imageSimilarity ?? 0,

                categoryScore:
                    match.signals.categoryScore ?? 0,

                locationScore:
                    match.signals.locationScore ?? 0,

                dateScore:
                    match.signals.dateScore ?? 0
            },

            rank: index + 1,

            verificationStatus: "Pending"
        })
    );

    if (matchDocuments.length === 0) {
        return [];
    }

    const savedMatches =
        await Match.insertMany(matchDocuments);

    return savedMatches;
}

module.exports = {
    saveMatches
};