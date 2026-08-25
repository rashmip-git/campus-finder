const {
    generateTextEmbedding,
    generateImageEmbedding
} = require("./embeddingService");

const { cosineSimilarity } = require("./similarityService");

const { buildItemText } = require("./itemTextBuilder");

const ITEMS = [
    {
        name: "brown wallet",
        category: "Wallet",
        location: "ps parking",
        status: "Lost",
        image: "https://res.cloudinary.com/dzp8wfvo9/image/upload/v1765290087/campusfinder-items/munf55jn72log8kpvztx.png"
    },
    {
        name: "victus",
        category: "Laptop",
        location: "is dept",
        status: "Found",
        image: "https://res.cloudinary.com/dzp8wfvo9/image/upload/v1765290376/campusfinder-items/r9utmcauaflzq2mfoufo.png"
    },
    {
        name: "dell laptop",
        category: "Laptop",
        location: "golden jublie",
        status: "Found",
        image: "https://res.cloudinary.com/dzp8wfvo9/image/upload/v1765290319/campusfinder-items/xhqv5mnlkn0fby7r7bfg.png"
    },
    {
        name: "redmi phone",
        category: "Phone",
        location: "aloks canteen",
        status: "Found",
        image: "https://res.cloudinary.com/dzp8wfvo9/image/upload/v1765289938/campusfinder-items/bhzvpuvaocgmeklvkypq.png"
    }
];

async function test() {
    try {
        console.log("=== ITEM TEXT ===\n");

        for (const item of ITEMS) {
            console.log(`${item.name}:`);
            console.log(buildItemText(item));
            console.log();
        }

        console.log("Generating text embeddings...\n");

        const textEmbeddings = {};

        for (const item of ITEMS) {
            const itemText = buildItemText(item);

            console.log(`Generating embedding for: ${item.name}`);

            textEmbeddings[item.name] =
                await generateTextEmbedding(itemText);
        }

        const lostItem = ITEMS.find(
            item => item.status === "Lost"
        );

        console.log("\n=== TEXT SIMILARITY ===\n");

        for (const foundItem of ITEMS.filter(
            item => item.status === "Found"
        )) {
            const similarity = cosineSimilarity(
                textEmbeddings[lostItem.name],
                textEmbeddings[foundItem.name]
            );

            console.log(
                `${lostItem.name} ↔ ${foundItem.name}: ${similarity.toFixed(4)}`
            );
        }

    } catch (error) {
        console.error("\nSimilarity test failed:");
        console.error(error);
    }
}

test();