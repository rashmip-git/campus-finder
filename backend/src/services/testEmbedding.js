const {
    generateTextEmbedding,
    generateImageEmbedding
} = require("./embeddingService");

const IMAGE_URL =
    "https://res.cloudinary.com/dzp8wfvo9/image/upload/v1765290376/campusfinder-items/r9utmcauaflzq2mfoufo.png";

async function test() {
    try {
        console.log("\n--- TEXT TEST ---");

        const textEmbedding =
            await generateTextEmbedding("black Dell laptop");

        console.log("Text embedding generated!");
        console.log("Text embedding length:", textEmbedding.length);

        console.log("\n--- IMAGE TEST ---");

        const imageEmbedding =
            await generateImageEmbedding(IMAGE_URL);

        console.log("Image embedding generated!");
        console.log("Image embedding length:", imageEmbedding.length);
        console.log(
            "First 10 image values:",
            imageEmbedding.slice(0, 10)
        );

    } catch (error) {
        console.error("\nEmbedding test failed:");
        console.error(error);
    }
}

test();