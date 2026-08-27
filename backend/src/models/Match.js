const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
    {
        newItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
            required: true
        },

        candidateItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
            required: true
        },

        score: {
            type: Number,
            required: true,
            min: 0,
            max: 1
        },

        signals: {
            textSimilarity: {
                type: Number,
                default: 0
            },

            imageSimilarity: {
                type: Number,
                default: 0
            },

            categoryScore: {
                type: Number,
                default: 0
            },

            locationScore: {
                type: Number,
                default: 0
            },

            dateScore: {
                type: Number,
                default: 0
            }
        },

        rank: {
            type: Number,
            required: true
        },

        verificationStatus: {
            type: String,
            enum: [
                "Pending",
                "Accepted",
                "Rejected"
            ],
            default: "Pending"
        },

        verificationToken: {
            type: String,
            unique: true,
            sparse: true
        },

        verifiedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Match",
    matchSchema
);