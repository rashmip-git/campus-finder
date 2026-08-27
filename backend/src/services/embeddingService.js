const {
    CLIPTextModelWithProjection,
    CLIPVisionModelWithProjection,
    AutoTokenizer,
    AutoProcessor,
    RawImage
} = require("@huggingface/transformers");

const MODEL_NAME = "Xenova/clip-vit-base-patch32";

let tokenizer = null;
let textModel = null;
let processor = null;
let visionModel = null;

async function loadTextModel() {
    if (!tokenizer) {
        console.log("Loading CLIP tokenizer...");
        tokenizer = await AutoTokenizer.from_pretrained(MODEL_NAME);

        console.log("Loading CLIP text model...");
textModel = await CLIPTextModelWithProjection.from_pretrained(
    MODEL_NAME,
    { dtype: "q8" }
);

        console.log("CLIP text model loaded.");
    }

    return { tokenizer, textModel };
}

async function loadVisionModel() {
    if (!processor) {
        console.log("Loading CLIP image processor...");
        processor = await AutoProcessor.from_pretrained(MODEL_NAME);

        console.log("Loading CLIP vision model...");
       visionModel = await CLIPVisionModelWithProjection.from_pretrained(
    MODEL_NAME,
    { dtype: "q8" }
);

        console.log("CLIP vision model loaded.");
    }

    return { processor, visionModel };
}

async function generateTextEmbedding(text) {
    if (!text || typeof text !== "string") {
        throw new Error("Text is required for embedding generation.");
    }

    const { tokenizer, textModel } = await loadTextModel();

    const inputs = await tokenizer(text);
    const output = await textModel(inputs);

    return Array.from(output.text_embeds.data);
}

async function generateImageEmbedding(imageUrl) {
    if (!imageUrl || typeof imageUrl !== "string") {
        throw new Error("Image URL is required for embedding generation.");
    }

    const { processor, visionModel } = await loadVisionModel();
    
    const image = await RawImage.fromURL(imageUrl);

const imageInputs = await processor(image);

const output = await visionModel(imageInputs);

    return Array.from(output.image_embeds.data);
}

module.exports = {
    generateTextEmbedding,
    generateImageEmbedding
};