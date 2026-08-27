const Match = require("../models/Match");

const {
    sendMatchVerificationEmail
} = require("./emailService");

async function sendNextMatchVerification(newItemId) {

    const match = await Match.findOne({
        verificationStatus: "Pending",
        $or: [
            { newItem: newItemId },
            { candidateItem: newItemId }
        ]
    })
        .sort({ rank: 1 })
        .populate("newItem")
        .populate("candidateItem");

    if (!match) {
        console.log("No pending matches available.");
        return null;
    }

    // Ignore matches involving resolved items
    if (
        match.newItem.status === "Resolved" ||
        match.candidateItem.status === "Resolved"
    ) {
        console.log("No active pending matches available.");
        return null;
    }

    let lostItem;
    let foundItem;

    // Determine which item is Lost and which is Found
    if (match.newItem.status === "Lost") {
        lostItem = match.newItem;
        foundItem = match.candidateItem;
    } else {
        lostItem = match.candidateItem;
        foundItem = match.newItem;
    }

    // Email goes to the person who LOST the item
    const verificationUrl =
    `${process.env.FRONTEND_URL}/category/${encodeURIComponent(foundItem.category)}`;

    await sendMatchVerificationEmail({
        to: lostItem.email,
        candidateItem: foundItem,
        newItem: lostItem,
        verificationUrl
    });

    console.log(
        `📧 Match email sent to lost-item owner: ${lostItem.email}`
    );

    return match;
}

module.exports = {
    sendNextMatchVerification
};