const mongoose = require("mongoose");

/*
    - itemName => The name of the item being reviewed.
    - content => The main content of the review where user can write.
    - isRecommended => A true/false property to show if the reviewer recommends the item.
    - itemImgSrc => String of the src to the image of the review item.
    - lastUpdated => Date when the review was last updated.
*/

// Define the schema for the Review model
const reviewSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isRecommended: {
        type: Boolean,
        required: true
    },
    itemImgSrc: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Review", reviewSchema);
