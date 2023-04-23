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
    check('name')
        .exists({ checkFalsy: true })
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
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];


//Create a spot
router.post("/", requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.create({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price });
    res.status(201).json(spot);
})

//Add an image to a Spot based on the Spots id
router.post("/:spotId/images", requireAuth, async (req, res) => {
    const user = req.user.id;
    const { url, preview } = req.body;
    let spot = await Spot.findByPk(req.params.spotId);
    if (!spot) res.status(404).json({ "message": "Spot couldn't be found" })

    spot = spot.toJSON();
    if (spot.ownerId !== user) res.status(400).json({ "Error": "Must be owner to add image to spot"})
    spot.id = user;
    spot.url = url;
    spot.preview = preview

    res.status(200).json({ id: user, url: spot.url, preview: spot.preview });
})

//Edit a spot
router.put("/:spotId", requireAuth, validateSpot, async (req, res) => {
    const user = req.user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    let spot = await Spot.findByPk(req.params.spotId)
    if (!spot) res.status(404).json({ "message": "Spot couldn't be found" })

    spot = spot.toJSON();
    if (spot.ownerId !== user) res.status(403).json({"message": "Must be owner to edit spot"});

        spot.address = address,
        spot.city = city,
        spot.state = state,
        spot.country = country,
        spot.lat = lat,
        spot.lng = lng,
        spot.name = name,
        spot.description = description,
        spot.price = price
        spot.updatedAt = new Date();
    res.status(200).json(spot);
})

//Get all spots by current User
router.get("/current", requireAuth, async (req, res) => {

    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            { model: SpotImage },
            { model: Review }
        ]
    })

    let spotsList = [];
    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    });

    spotsList.forEach(spot => {
        let count = 0;
        let sum = 0;
        spot.Reviews.forEach(review => {
            sum += review.stars;
            count++;
        })
        let total = sum / count;
        spot.avgRating = total;
        if (!spot.Reviews.length) {
            spot.avgRating = 'No reviews'
        }
        delete spot.Reviews;

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

    return res.json({ Spots: spotsList });
})


//Get spot by spotId
router.get("/:spotId", async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId, {
        include: [
            { model: Review },
            { 
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    })

    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" })

    spot = spot.toJSON()
     let count = 0;
    let sum = 0;
    spot.Reviews.forEach(review => {
        sum += review.stars;
        count++;
    })
    let total = sum / count;
    spot.numReviews = count;
    spot.avgStarRating = total;
    if (!spot.Reviews.length) {
        spot.avgStarRating = 'No reviews',
        spot.numReviews = 'No reviews'
    }
    spot.Owner = spot.User
   
    delete spot.Reviews;
    delete spot.User;

    // spot.SpotImages.forEach(image => {
    //     spot.SpotImages += image
    // })
    // if (!spot.previewImage) {
    //     spot.previewImage = 'No spot image found'
    // }
    // delete spot.SpotImages;

    return res.json(spot);
})

//Get all spots
router.get("/", async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            { model: SpotImage },
            { model: Review }
        ]
    })

    let spotsList = [];
    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    });

    spotsList.forEach(spot => {
        let count = 0;
        let sum = 0;
        spot.Reviews.forEach(review => {
            sum += review.stars;
            count++;
        })
        let total = sum / count;
        spot.avgRating = total;
        if (!spot.Reviews.length) {
            spot.avgRating = 'No reviews'
        }
        delete spot.Reviews;

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

//Delete a spot
router.delete("/:spotId", requireAuth, async (req, res) => {
    const user = req.user.id;
    let spot = await Spot.findByPk(req.params.spotId)
    if (!spot) return res.status(404).json({ "message": "Spot couldn't be found" })

    // spot = spot.toJSON();
    if (spot.ownerId === user) {
    await spot.destroy();
    res.status(200).json({ "message": "Successfully deleted" })
    } else {res.status(403).json({ "message": "Unauthorized" })};

})

module.exports = router;