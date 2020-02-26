const router = require("express").Router();
const Review = require("../models/Review");
const mongoose = require("mongoose");
const validateReview = require("../validation/reviewValidation");

router.post("/", async (req, res) => {
    // validate submitted data before adding a new review
    const errorMessages = validateReview(req.body);
    if (errorMessages.length > 0) {
        return res.status(400).send({
            messages: errorMessages
        });
    }

    // Create a new review object based on the recieved data
    const review = new Review({
        itemName: req.body.itemName,
        content: req.body.content,
        itemImgSrc: req.body.itemImgSrc,
        isRecommended: req.body.isRecommended,
        lastUpdated: new Date()
    });

    // Try to save the new review to the Database
    try {
        await review.save();
        res.status(200).send({ review: review });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get("/", async (req, res) => {
    // Find all reviews in the Database and send them in response
    Review.find({}, (err, reviews) => {
        res.status(200).send(reviews);
    });
});

// Route to edit a specific Review by ID
router.patch("/:reviewId", (req, res) => {
    // Find the Review with the ID and updated it with the recieved object
    Review.findByIdAndUpdate(
        req.params.reviewId,
        req.body.review,
        { new: true, useFindAndModify: false },
        (err, review) => {
            if (err) {
                return res.status(400).send(err);
            }
            return res.status(200).send(review);
        }
    );
});

// Route for deleting all reviews that are not recommended 
router.delete("/notrecommended", (req, res) => {
    // Filter for all reviews that are not recommended and delete them
    Review.deleteMany({ isRecommended: false }, err => {
        if (err) {
            return res.status(500).send(err);
        }

        // Return all the rest of the reviews to the client (So it can change its state)
        Review.find({}, (err, reviews) => {
            if (err) {
                return res.status(500).send(err);
            }

            return res.status(200).send(reviews);
        });
    });
});

// Route to delete a review by a specific ID
router.delete("/:reviewId", (req, res) => {
    // Find the review with the specified ID parameter and delete it fromt the DB
    Review.findByIdAndDelete(req.params.reviewId, (err, review) => {
        if (err) {
            return res.status(400).send(err);
        }

        return res.status(200).send(review._id);
    });
});

// Router to delete all the Reviews from the DB collection
router.delete("/", (req, res) => {
    Review.deleteMany({}, err => {
        if (err) {
            return res.status(500).send(err);
        }

        return res.status(200).send([]);
    });
});

module.exports = router;
