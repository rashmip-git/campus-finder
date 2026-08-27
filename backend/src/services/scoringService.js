/*const { cosineSimilarity } = require("./similarityService");
const { buildItemText } = require("./itemTextBuilder");
const {
    generateTextEmbedding,
    generateImageEmbedding
} = require("./embeddingService");

function calculateCategoryScore(itemA, itemB) {
    if (!itemA.category || !itemB.category) {
        return null;
    }

    return itemA.category.toLowerCase() === itemB.category.toLowerCase()
        ? 1
        : 0;
}

function normalizeLocation(text) {
    if (!text) return [];

    return text
        .toLowerCase()
        .replace(/[.,]/g, " ")
        .replace(/\bdept\b/g, "department")
        .split(/\s+/)
        .filter(Boolean);
}

function calculateLocationScore(itemA, itemB) {
    if (!itemA.location || !itemB.location) {
        return null;
    }

    const tokensA = normalizeLocation(itemA.location);
    const tokensB = normalizeLocation(itemB.location);

    const setA = new Set(tokensA);
    const setB = new Set(tokensB);

    // Exact normalized match
    if (
        tokensA.join(" ") === tokensB.join(" ")
    ) {
        return 1;
    }

    // Calculate Jaccard token similarity
    const intersection = [...setA].filter(
        token => setB.has(token)
    );

    const union = new Set([
        ...setA,
        ...setB
    ]);

    if (union.size === 0) {
        return 0;
    }

    const jaccard =
        intersection.length / union.size;

    // Strong partial overlap
    if (jaccard >= 0.5) {
        return 0.8;
    }

    // Some overlap
    if (jaccard > 0) {
        return 0.5;
    }

    return 0;
}

function calculateDateScore(itemA, itemB) {
    if (!itemA.date || !itemB.date) {
        return null;
    }

    const dateA = new Date(itemA.date);
    const dateB = new Date(itemB.date);

    const differenceMs = Math.abs(dateA - dateB);
    const differenceDays =
        differenceMs / (1000 * 60 * 60 * 24);

    return Math.exp(-differenceDays / 7);
}

async function calculateSimilaritySignals(itemA, itemB) {
    const textA = buildItemText(itemA);
    const textB = buildItemText(itemB);

    const textEmbeddingA =
        await generateTextEmbedding(textA);

    const textEmbeddingB =
        await generateTextEmbedding(textB);

    const textSimilarity = cosineSimilarity(
        textEmbeddingA,
        textEmbeddingB
    );

    let imageSimilarity = null;

    if (itemA.image && itemB.image) {
        const imageEmbeddingA =
            await generateImageEmbedding(itemA.image);

        const imageEmbeddingB =
            await generateImageEmbedding(itemB.image);

        imageSimilarity = cosineSimilarity(
            imageEmbeddingA,
            imageEmbeddingB
        );
    }

    const categoryScore =
        calculateCategoryScore(itemA, itemB);

    const locationScore =
        calculateLocationScore(itemA, itemB);

    const dateScore =
        calculateDateScore(itemA, itemB);

    return {
        textSimilarity,
        imageSimilarity,
        categoryScore,
        locationScore,
        dateScore
    };
}

function calculateCompositeScore(signals, weights = {}) {
    const {
        textSimilarity = 0,
        imageSimilarity = 0,
        categoryScore = 0,
        locationScore = 0,
        dateScore = 0
    } = signals;

    const {
        text = 0.30,
        image = 0.30,
        category = 0.15,
        location = 0.10,
        date = 0.15
    } = weights;

    const totalWeight =
        text +
        image +
        category +
        location +
        date;

    if (totalWeight <= 0) {
        throw new Error("At least one scoring weight must be greater than zero.");
    }

    const score =
        (
            textSimilarity * text +
            imageSimilarity * image +
            categoryScore * category +
            locationScore * location +
            dateScore * date
        ) / totalWeight;

    return score;
}

function calculateMatchScore(signals) {
    const {
        textSimilarity = 0,
        imageSimilarity = 0,
        categoryScore = 0,
        locationScore = 0,
        dateScore = 0
    } = signals;

    // Image is the strongest signal.
    // Other signals provide supporting evidence.
    const imageWeight = 0.50;
    const textWeight = 0.20;
    const categoryWeight = 0.15;
    const locationWeight = 0.10;
    const dateWeight = 0.05;

    const score =
        imageSimilarity * imageWeight +
        textSimilarity * textWeight +
        categoryScore * categoryWeight +
        locationScore * locationWeight +
        dateScore * dateWeight;

    return Math.max(0, Math.min(1, score));
}

module.exports = {
    calculateSimilaritySignals,
    calculateCompositeScore,
    calculateMatchScore,
    calculateLocationScore
};*/
const { cosineSimilarity } = require("./similarityService");

function calculateCategoryScore(itemA, itemB) {
    if (!itemA.category || !itemB.category) {
        return null;
    }

    return itemA.category.toLowerCase() === itemB.category.toLowerCase()
        ? 1
        : 0;
}

function normalizeLocation(text) {
    if (!text) return [];

    return text
        .toLowerCase()
        .replace(/[.,]/g, " ")
        .replace(/\bdept\b/g, "department")
        .split(/\s+/)
        .filter(Boolean);
}

function calculateLocationScore(itemA, itemB) {
    if (!itemA.location || !itemB.location) {
        return null;
    }

    const tokensA = normalizeLocation(itemA.location);
    const tokensB = normalizeLocation(itemB.location);

    const setA = new Set(tokensA);
    const setB = new Set(tokensB);

    if (tokensA.join(" ") === tokensB.join(" ")) {
        return 1;
    }

    const intersection = [...setA].filter(
        token => setB.has(token)
    );

    const union = new Set([
        ...setA,
        ...setB
    ]);

    if (union.size === 0) {
        return 0;
    }

    const jaccard =
        intersection.length / union.size;

    if (jaccard >= 0.5) {
        return 0.8;
    }

    if (jaccard > 0) {
        return 0.5;
    }

    return 0;
}

function calculateDateScore(itemA, itemB) {
    if (!itemA.date || !itemB.date) {
        return null;
    }

    const dateA = new Date(itemA.date);
    const dateB = new Date(itemB.date);

    const differenceMs = Math.abs(dateA - dateB);

    const differenceDays =
        differenceMs / (1000 * 60 * 60 * 24);

    return Math.exp(-differenceDays / 7);
}

async function calculateSimilaritySignals(itemA, itemB) {

    // Use stored embeddings instead of generating them again.
    let textSimilarity = 0;
    let imageSimilarity = null;

    if (
        Array.isArray(itemA.textEmbedding) &&
        itemA.textEmbedding.length > 0 &&
        Array.isArray(itemB.textEmbedding) &&
        itemB.textEmbedding.length > 0
    ) {
        textSimilarity = cosineSimilarity(
            itemA.textEmbedding,
            itemB.textEmbedding
        );
    }

    if (
        Array.isArray(itemA.imageEmbedding) &&
        itemA.imageEmbedding.length > 0 &&
        Array.isArray(itemB.imageEmbedding) &&
        itemB.imageEmbedding.length > 0
    ) {
        imageSimilarity = cosineSimilarity(
            itemA.imageEmbedding,
            itemB.imageEmbedding
        );
    }

    const categoryScore =
        calculateCategoryScore(itemA, itemB);

    const locationScore =
        calculateLocationScore(itemA, itemB);

    const dateScore =
        calculateDateScore(itemA, itemB);

    return {
        textSimilarity,
        imageSimilarity,
        categoryScore,
        locationScore,
        dateScore
    };
}

function calculateCompositeScore(signals, weights = {}) {
    const {
        textSimilarity = 0,
        imageSimilarity = 0,
        categoryScore = 0,
        locationScore = 0,
        dateScore = 0
    } = signals;

    const {
        text = 0.30,
        image = 0.30,
        category = 0.15,
        location = 0.10,
        date = 0.15
    } = weights;

    const totalWeight =
        text +
        image +
        category +
        location +
        date;

    if (totalWeight <= 0) {
        throw new Error(
            "At least one scoring weight must be greater than zero."
        );
    }

    const score =
        (
            textSimilarity * text +
            imageSimilarity * image +
            categoryScore * category +
            locationScore * location +
            dateScore * date
        ) / totalWeight;

    return score;
}

function calculateMatchScore(signals) {
    const {
        textSimilarity = 0,
        imageSimilarity = 0,
        categoryScore = 0,
        locationScore = 0,
        dateScore = 0
    } = signals;

    // Image is the strongest signal.
    const imageWeight = 0.50;
    const textWeight = 0.20;
    const categoryWeight = 0.15;
    const locationWeight = 0.10;
    const dateWeight = 0.05;

    const score =
        imageSimilarity * imageWeight +
        textSimilarity * textWeight +
        categoryScore * categoryWeight +
        locationScore * locationWeight +
        dateScore * dateWeight;

    return Math.max(0, Math.min(1, score));
}

module.exports = {
    calculateSimilaritySignals,
    calculateCompositeScore,
    calculateMatchScore,
    calculateLocationScore
};
