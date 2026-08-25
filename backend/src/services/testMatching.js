const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Item = require("../models/Item");
const { findRankedMatches } = require("./matchingService");

dotenv.config();

async function test() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected.\n");

        const lostItem = await Item.findOne({
    status: "Lost"
}).sort({
    createdAt: -1
});

        if (!lostItem) {
            throw new Error("No Lost item found.");
        }

        console.log(
            `NEW ITEM: ${lostItem.name} (${lostItem.status})\n`
        );

        const matches =
            await findRankedMatches(lostItem);

        console.log("=== RANKED MATCHES ===\n");

        for (const [index, match] of matches.entries()) {
            console.log(
                `${index + 1}. ${match.item.name}`
            );

            console.log(
                `   Status: ${match.item.status}`
            );

            console.log(
                `   Score: ${match.score.toFixed(4)}`
            );

            console.log(
                `   Score %: ${(match.score * 100).toFixed(2)}%`
            );

            console.log(
                `   Signals:`,
                match.signals
            );

            console.log();
        }

        await mongoose.disconnect();

    } catch (error) {
        console.error("\nMatching test failed:");
        console.error(error);

        await mongoose.disconnect();
    }
}

test();