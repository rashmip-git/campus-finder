const {
    calculateSimilaritySignals,
    calculateMatchScore
} = require("./scoringService");

const items = {
    yellowBottle: {
        name: "Yellow tang bottle",
        category: "Others",
        location: "Cs001",
        date: "2026-08-07T00:00:00.000Z",
        image: "https://res.cloudinary.com/dzp8wfvo9/image/upload/v1787684542/campusfinder-items/cn663quhkagwd308lwcv.jpg"
    },

    waterBottle: {
        name: "Water bottle",
        category: "Others",
        location: "Cs dept",
        date: "2026-08-08T00:00:00.000Z",
        image: "https://res.cloudinary.com/dzp8wfvo9/image/upload/v1787684663/campusfinder-items/lhsfj0jholrb8nwf2ipi.jpg"
    },

    earbuds: {
        name: "Leevo earpods",
        category: "Electronics",
        location: "Ps block",
        date: "2026-08-04T00:00:00.000Z",
        image: "https://res.cloudinary.com/dzp8wfvo9/image/upload/v1787685819/campusfinder-items/kxoziid7dmfgukame9uw.jpg"
    },

    hpLaptop: {
        name: "Hp laptop",
        category: "Laptop",
        location: "Laras",
        date: "2026-05-21T00:00:00.000Z",
        image: "https://res.cloudinary.com/dzp8wfvo9/image/upload/v1779381851/campusfinder-items/yzoblclazwqkp3pnipvf.jpg"
    },

    hpLaptopGrey: {
        name: "Hp Laptop,Grey colour",
        category: "Laptop",
        location: "Laras",
        date: "2026-05-20T00:00:00.000Z",
        image: "https://res.cloudinary.com/dzp8wfvo9/image/upload/v1779381733/campusfinder-items/zui8gxy5vrjkpsgkjnza.jpg"
    },

    redmiPhone: {
        name: "redmi phone",
        category: "Phone",
        location: "laras",
        date: "2025-12-05T00:00:00.000Z",
        image: "https://res.cloudinary.com/dzp8wfvo9/image/upload/v1765310227/campusfinder-items/b684kup0m5y0cqbfolxe.png"
    },

    book: {
        name: "Oops book",
        category: "Others",
        location: "Latas",
        date: "2025-12-10T00:00:00.000Z",
        image: "https://res.cloudinary.com/dzp8wfvo9/image/upload/v1765364973/campusfinder-items/fojjvyaeilxyfvnpvdcf.jpg"
    }
};

const pairs = [
    ["Yellow bottle ↔ Water bottle", "yellowBottle", "waterBottle"],
    ["Yellow bottle ↔ Earbuds", "yellowBottle", "earbuds"],
    ["Water bottle ↔ Earbuds", "waterBottle", "earbuds"],
    ["HP laptop ↔ HP laptop grey", "hpLaptop", "hpLaptopGrey"],
    ["HP laptop ↔ Redmi phone", "hpLaptop", "redmiPhone"],
    ["Water bottle ↔ Book", "waterBottle", "book"]
];

async function test() {
    console.log("\n======================================");
    console.log("PRODUCTION MATCH SCORE TEST");
    console.log("======================================\n");

    try {
        for (const [label, keyA, keyB] of pairs) {
            const itemA = items[keyA];
            const itemB = items[keyB];

            console.log(`\n${label}`);

            const signals = await calculateSimilaritySignals(
                itemA,
                itemB
            );

            const score = calculateMatchScore(signals);

            console.log("Signals:");
            console.log({
                textSimilarity: Number(signals.textSimilarity.toFixed(4)),
                imageSimilarity: Number(signals.imageSimilarity.toFixed(4)),
                categoryScore: signals.categoryScore,
                locationScore: signals.locationScore,
                dateScore: Number(signals.dateScore.toFixed(4))
            });

            console.log(
                `Final score: ${score.toFixed(4)}`
            );

            console.log(
                `Final score %: ${(score * 100).toFixed(2)}%`
            );
        }

    } catch (error) {
        console.error("\nProduction scoring test failed:");
        console.error(error);
    }
}

test();