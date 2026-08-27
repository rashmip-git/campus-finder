/*const item = require("../../models/Item");

const {
    generateTextEmbedding,
    generateImageEmbedding
} = require("../../services/embeddingService");

const {
    buildItemText
} = require("../../services/itemTextBuilder");

module.exports = async (req, res, next) => {
    try {
        const {
            name,
            category,
            location,
            date,
            contact,
            email,
            status
        } = req.body;

        const imageUrl = req.file
            ? req.file.path
            : "default.jpg";

        const finalStatus =
            status && ["Lost", "Found"].includes(status)
                ? status
                : "Lost";

        // Build the same text representation used by matching
        const itemData = {
            name,
            category,
            location,
            date
        };

        console.log("Generating text embedding...");

        const text = buildItemText(itemData);

        const textEmbedding =
            await generateTextEmbedding(text);

        let imageEmbedding = [];

        // Generate image embedding only when an actual image exists
        if (req.file && imageUrl !== "default.jpg") {
            console.log("Generating image embedding...");

            imageEmbedding =
                await generateImageEmbedding(imageUrl);
        }

        console.log("Embeddings generated.");

        const i = await item.create({
            name,
            category,
            location,
            date,
            contact,
            email,
            image: imageUrl,
            status: finalStatus,
            uploadedBy: req.user._id,
            createdAt: Date.now(),

            // NEW
            textEmbedding,
            imageEmbedding
        });

        res.status(201).json({
            message: "item uploaded successfully!!",
            item: i
        });

    } catch (err) {
        console.error("Item creation / embedding error:", err);
        next(err);
    }
};*/
const item = require("../../models/Item");

const {
    generateTextEmbedding,
    generateImageEmbedding
} = require("../../services/embeddingService");

const {
    buildItemText
} = require("../../services/itemTextBuilder");

const {
    findRankedMatches
} = require("../../services/matchingService");

const {
    saveMatches
} = require("../../services/matchService");

const {
    sendNextMatchVerification
} = require("../../services/verificationService");

module.exports = async (req, res, next) => {
    try {
        const {
            name,
            category,
            location,
            date,
            contact,
            email,
            status
        } = req.body;

        const imageUrl = req.file
            ? req.file.path
            : "default.jpg";

        const finalStatus =
            status && ["Lost", "Found"].includes(status)
                ? status
                : "Lost";

        // --------------------------------
        // 1. Build text embedding
        // --------------------------------

        const itemData = {
            name,
            category,
            location,
            date
        };

        console.log("Generating text embedding...");

        const text = buildItemText(itemData);

        const textEmbedding =
            await generateTextEmbedding(text);

        // --------------------------------
        // 2. Build image embedding
        // --------------------------------

        let imageEmbedding = [];

        if (
            req.file &&
            imageUrl !== "default.jpg"
        ) {
            console.log("Generating image embedding...");

            imageEmbedding =
                await generateImageEmbedding(imageUrl);
        }

        console.log("Embeddings generated.");

        // --------------------------------
        // 3. Save item
        // --------------------------------

        const i = await item.create({
            name,
            category,
            location,
            date,
            contact,
            email,
            image: imageUrl,
            status: finalStatus,
            uploadedBy: req.user._id,
            createdAt: Date.now(),

            textEmbedding,
            imageEmbedding
        });

        console.log(
            `Item saved: ${i.name} (${i.status})`
        );

        // --------------------------------
        // 4. Find automatic matches
        // --------------------------------

        console.log("Finding ranked matches...");

        const matches =
            await findRankedMatches(i);

        console.log(
            `Found ${matches.length} possible matches.`
        );

        const savedMatches =
    await saveMatches(i, matches);

console.log(
    `Saved ${savedMatches.length} match records.`
);

await sendNextMatchVerification(i._id);

        // --------------------------------
        // 5. Return item + matches
        // --------------------------------

        res.status(201).json({
            message: "item uploaded successfully!!",
            item: i,
            matches: matches.map(match => ({
                item: match.item,
                score: match.score,
                signals: match.signals
            }))
        });

    } catch (err) {
        console.error(
            "Item creation / matching error:",
            err
        );

        next(err);
    }
};