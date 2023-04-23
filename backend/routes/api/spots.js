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
    await setTokenCookie(res, spot);
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

    const addImage = await SpotImage.create({
        spotId: spot.id,
        url,
        preview
    })
    // spot.id = user;
    // spot.url = url;
    // spot.preview = preview

    res.status(200).json({ id: addImage.spotId, url: addImage.url, preview: addImage.preview});
})

//Get all Bookings for a Spot based on the Spot's Id
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const userId = req.user.id;
    const spot = await Spot.findByPk(spotId);
    if (!spot) return res.status(404).json({ "message": "Spot couldn't be found" })
    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    })
    // console.log(bookings)
    let bookingsList = [];
    bookings.forEach(booking => {
        bookingsList.push(booking.toJSON())
    })
    // console.log(bookingsList) 
    // if (!bookingsList.length) return res.status(200).json({ "message": "No bookings for this spot"})
    
    bookingsList.forEach(booking => {
        booking.startDate = booking.startDate.toJSON().slice(0, 10);
        booking.endDate = booking.endDate.toJSON().slice(0, 10)
        if (booking.userId !== userId) {
            return res.status(200).json({ Bookings: [{ "spotId": booking.spotId, startDate: booking.startDate, endDate: booking.endDate}]})
        }
    })
    res.status(200).json({ Bookings: bookingsList })
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

//Create a Review for a Spot based on the Spot's id
router.post("/:spotId/reviews", requireAuth, validateReview, async (req, res) => {
    const { spotId } = req.params;
    const { review, stars } = req.body;
    const userId = req.user.id;
    const spot = await Spot.findByPk(spotId);
    if (!spot) return res.status(404).json({ "message": "Spot couldn't be found" })
    const reviews = await Review.findAll({
        where: [
            {
                spotId: spotId,
                userId: userId
            }
        ]
    })
    if (reviews.length) return res.status(500).json({ "message": "User already has a review for this spot" })
    if (stars >= 6 || stars <= 0) return res.status(400).json({ "stars": "Stars must be an integer from 1 to 5"})
    const createReview = await Review.create({
        userId,
        spotId,
        review,
        stars
    })
    res.status(200).json(createReview)
})

//Get all Review's by a Spot's id
router.get("/:spotId/reviews", async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) return res.status(404).json({ "message": "Spot couldn't be found"})

    const reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })
    
    res.status(200).json({ Reviews: reviews });

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
     if (!spot.SpotImages.length) spot.SpotImages = 'No images for this spot';

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