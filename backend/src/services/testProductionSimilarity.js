const {
    generateTextEmbedding,
    generateImageEmbedding
} = require("./embeddingService");

function cosineSimilarity(vecA, vecB) {
    let dot = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
        dot += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }

    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

const items = {
    yellowBottle: {
        name: "Yellow tang bottle",
        category: "Others",
        location: "Cs001",
        image: "https://res.cloudinary.com/dzp8wfvo9/image/upload/v1787684542/campusfinder-items/cn663quhkagwd308lwcv.jpg"
    },

    waterBottle: {
        name: "Water bottle",
        category: "Others",
        location: "Cs dept",
        image: "https://res.cloudinary.com/dzp8wfvo9/image/upload/v1787684663/campusfinder-items/lhsfj0jholrb8nwf2ipi.jpg"
    },

    earbuds: {
        name: "Leevo earpods",
        category: "Electronics",
        location: "Ps block",
        image: "https://res.cloudinary.com/dzp8wfvo9/image/upload/v1787685819/campusfinder-items/kxoziid7dmfgukame9uw.jpg"
    },

    hpLaptop: {
        name: "Hp laptop",
        category: "Laptop",
        location: "Laras",
        image: "https://res.cloudinary.com/dzp8wfvo9/image/upload/v1779381851/campusfinder-items/yzoblclazwqkp3pnipvf.jpg"
    },

    hpLaptopGrey: {
        name: "Hp Laptop,Grey colour",
        category: "Laptop",
        location: "Laras",
        image: "https://res.cloudinary.com/dzp8wfvo9/image/upload/v1779381733/campusfinder-items/zui8gxy5vrjkpsgkjnza.jpg"
    },

    redmiPhone: {
        name: "redmi phone",
        category: "Phone",
        location: "laras",
        image: "https://res.cloudinary.com/dzp8wfvo9/image/upload/v1765310227/campusfinder-items/b684kup0m5y0cqbfolxe.png"
    },

    book: {
        name: "Oops book",
        category: "Others",
        location: "Latas",
        image: "https://res.cloudinary.com/dzp8wfvo9/image/upload/v1765364973/campusfinder-items/fojjvyaeilxyfvnpvdcf.jpg"
    }
};

const pairs = [
    ["Yellow bottle ↔ Water bottle", "yellowBottle", "waterBottle"],
    ["Yellow bottle ↔ Earbuds", "yellowBottle", "earbuds"],
    ["HP laptop ↔ HP laptop grey", "hpLaptop", "hpLaptopGrey"],
    ["HP laptop ↔ Redmi phone", "hpLaptop", "redmiPhone"],
    ["Water bottle ↔ Book", "waterBottle", "book"],
    ["Redmi phone ↔ Earbuds", "redmiPhone", "earbuds"]
];

async function createText(item) {
    return `${item.name}. Category: ${item.category}. Location: ${item.location}`;
}

async function test() {

    console.log("\n======================================");
    console.log("CAMPUS FINDER SIMILARITY TEST MATRIX");
    console.log("======================================\n");

    const textCache = {};
    const imageCache = {};

    try {

        // -----------------------------
        // Generate embeddings once
        // -----------------------------

        for (const [key, item] of Object.entries(items)) {

            console.log(`Generating embeddings: ${item.name}`);

            const text = await createText(item);

            textCache[key] = await generateTextEmbedding(text);

            imageCache[key] = await generateImageEmbedding(item.image);
        }

        console.log("\n======================================");
        console.log("RESULTS");
        console.log("======================================\n");

        for (const [label, keyA, keyB] of pairs) {

            const textScore = cosineSimilarity(
                textCache[keyA],
                textCache[keyB]
            );

            const imageScore = cosineSimilarity(
                imageCache[keyA],
                imageCache[keyB]
            );

            console.log(label);

            console.log(
                `  Text  : ${textScore.toFixed(4)} (${(textScore * 100).toFixed(2)}%)`
            );

            console.log(
                `  Image : ${imageScore.toFixed(4)} (${(imageScore * 100).toFixed(2)}%)`
            );

            console.log();
        }

    } catch (error) {

        console.error("\nSimilarity test failed:");
        console.error(error);
    }
}

test();