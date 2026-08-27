require("dotenv").config();

const mongoose = require("mongoose");
const Item = require("../models/Item");

const {
    generateTextEmbedding,
    generateImageEmbedding
} = require("./embeddingService");

const {
    buildItemText
} = require("./itemTextBuilder");

async function generateMissingEmbeddings() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected.\n");

        const items = await Item.find({
            $or: [
                { textEmbedding: { $exists: false } },
                { textEmbedding: { $size: 0 } },
                { imageEmbedding: { $exists: false } },
                { imageEmbedding: { $size: 0 } }
            ]
        });

        console.log(
            `Found ${items.length} items needing embeddings.\n`
        );

        for (const item of items) {

            console.log(
                `Processing: ${item.name} (${item.status})`
            );

            try {
                // -----------------------------
                // TEXT EMBEDDING
                // -----------------------------

                const text = buildItemText(item);

                const textEmbedding =
                    await generateTextEmbedding(text);

                item.textEmbedding = textEmbedding;

                // -----------------------------
                // IMAGE EMBEDDING
                // -----------------------------

                if (
                    item.image &&
                    item.image !== "default.jpg" &&
                    !item.image.startsWith("/default")
                ) {
                    const imageEmbedding =
                        await generateImageEmbedding(item.image);

                    item.imageEmbedding = imageEmbedding;
                }

                await item.save();

                console.log(
                    `✓ Saved embeddings for ${item.name}`
                );

                console.log(
                    `  Text: ${item.textEmbedding.length}`
                );

                console.log(
                    `  Image: ${item.imageEmbedding?.length || 0}`
                );

                console.log();

            } catch (error) {
                console.error(
                    `✗ Failed for ${item.name}:`,
                    error.message
                );
            }
        }

        console.log(
            "======================================"
        );

        console.log(
            "EMBEDDING MIGRATION COMPLETE"
        );

        console.log(
            "======================================"
        );

    } catch (error) {
        console.error(
            "\nMigration failed:",
            error
        );
    } finally {
        await mongoose.disconnect();
    }
}

generateMissingEmbeddings();