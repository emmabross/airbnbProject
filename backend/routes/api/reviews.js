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