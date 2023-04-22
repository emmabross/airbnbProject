const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, Review, ReviewImage, User, SpotImage, Booking } = require('../../db/models');

const router = express.Router();

//Validate spots
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is invalid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is invalid'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is required'),
    check('name')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Stars must be an integer from 1 to 5')
];

//Edit a spot
router.put("/:spotId", async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        
    })
    console.log(spot)
})

//Get all spots
router.get("/", async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: SpotImage
            }
        ]
    })

    let spotsList = [];
    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    });

    spotsList.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url
            }
        })
        if (!spot.previewImage) {
            spot.previewImage = 'No spot image found'
        }
        delete spot.SpotImages;
    })

    return res.json(spotsList);
})

module.exports = router;