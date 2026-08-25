const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Item = require("../models/Item");
/*const { calculateSimilaritySignals } = require("./scoringService");*/
const {
    calculateSimilaritySignals,
    calculateCompositeScore,
    calculateMatchScore
} = require("./scoringService");

dotenv.config();

async function test() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected.\n");

        const lostItem = await Item.findOne({
            status: "Lost"
        });

        const foundItems = await Item.find({
            status: "Found"
        });

        if (!lostItem || foundItems.length === 0) {
            throw new Error(
                "Required Lost/Found test data not found."
            );
        }

        console.log(
            `Lost item: ${lostItem.name}\n`
        );

        for (const foundItem of foundItems) {
            console.log(
                `\nComparing with Found item: ${foundItem.name}`
            );

            const signals =
                await calculateSimilaritySignals(
                    lostItem,
                    foundItem
                );

                const compositeScore =
    calculateCompositeScore(signals);

    const matchScore =
    calculateMatchScore(signals);

console.log("Signals:", signals);

console.log(
    "Composite score:",
    compositeScore.toFixed(4)
);

console.log(
    "Composite score percentage:",
    (compositeScore * 100).toFixed(2) + "%"
);
console.log(
    "Category-aware match score:",
    matchScore.toFixed(4)
);

console.log(
    "Category-aware score percentage:",
    (matchScore * 100).toFixed(2) + "%"
);

            console.log(signals);
        }

        await mongoose.disconnect();

    } catch (error) {
        console.error("\nScoring test failed:");
        console.error(error);

        await mongoose.disconnect();
    }
}

test();