const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, Review, ReviewImage, User, SpotImage, Booking } = require('../../db/models');

const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            { 
                model: Spot,
                include: { model: SpotImage },
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
            }
        ]
    })

    let bookingsList = [];
    bookings.forEach(booking => {
        bookingsList.push(booking.toJSON())
    });
    
    bookingsList.forEach(booking => {
        booking.Spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                booking.Spot.previewImage = image.url
            }
        })
        if (!booking.Spot.previewImage) {
            booking.Spot.previewImage = 'No spot image found'
        }
        delete booking.Spot.SpotImages;
    })
    return res.status(200).json({ Bookings: bookingsList })
})



module.exports = router;