const mongoose = require("mongoose");

const groupMessageSchema = new mongoose.Schema({
    groupName: {
        type: String,
    },
    admin: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    members: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    ],
    messages: [
        {
            sender: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            },
            type: {
                type: String,
                enum: ["Text", "Media", "Document", "Link"],
            },
            text: {
                type: String,
            },
            isRemove: {
                type: Boolean,
                default: false
            },
            created_at: {
                type: Date,
                default: Date.now,
            },
            file: {
                type: String,
              },
        },
    ],
});

const GroupMessage = mongoose.model("GroupChat", groupMessageSchema);

module.exports = GroupMessage;