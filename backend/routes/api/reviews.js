const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, Review, ReviewImage, User, SpotImage, Booking } = require('../../db/models');

const router = express.Router();

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

//Delete a review
router.delete("/:reviewId", requireAuth, async (req, res) => {
    const user = req.user.id;
    let review = await Review.findByPk(req.params.reviewId);
    if (!review) return res.status(404).json({ "message": "Review couldn't be found" });

    if (review.userId === user) {
        await review.destroy();
        res.status(200).json({ "message": "Successfully deleted" })
    } else { res.status(403).json({ "message": "Unauthorized" }) }
})

//Edit a review
router.put("/:reviewId", requireAuth, validateReview, async (req, res) => {
    const user = req.user.id;
    const { review, stars } = req.body;
    let findReview = await Review.findByPk(req.params.reviewId)
    if (!findReview) res.status(404).json({ "message": "Review couldn't be found" })

    findReview = findReview.toJSON();
    if (findReview.userId !== user) res.status(403).json({ "message": "Unauthorized user" });

    findReview.review = review,
    findReview.stars = stars,
    findReview.updatedAt = new Date()
    if (stars >= 6 || stars <= 0) return res.status(400).json({ "stars": "Stars must be an integer from 1 to 5" })
    res.status(200).json(findReview);
})

//Add an Image to a Review based on the Review's Id
router.post("/:reviewId/images", requireAuth, async (req, res) => {
    const user = req.user.id
    const url = req.params.url;
    let review = await Review.findByPk(req.params.reviewId)
    if (!review) return res.status(404).json({ "message": "Review couldn't be found" })

    review = review.toJSON();
    if (review.userId !== user) res.status(400).json({ "Error": "Must be owner to add image to spot" })

    const addImage = await ReviewImage.create({
        id: review.reviewId,
        url
    })

    res.status(200).json({ id: review.id, url: addImage.url});
})

//Get reviews for current user
router.get("/current", requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {   
                model: User, 
                attributes: ['id', 'firstName', 'lastName']
            },
            { 
                model: Spot, 
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                }
            },
            { 
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    let reviewsList = [];
    reviews.forEach(review => {
        reviewsList.push(review.toJSON())
    });
    console.log(reviewsList)
    reviewsList.forEach(review => {
        review.ReviewImages.forEach(image => {
            if (image.url) {
                review.Spot.previewImage = image.url;
            }
        })
    })
    return res.json({ Reviews: reviewsList });
})


module.exports = router;