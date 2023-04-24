const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, Review, ReviewImage, User, SpotImage, Booking } = require('../../db/models');

const router = express.Router();

const validateBooking = [
    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage('Start date is required'),
    check('endDate')
        .exists({ checkFalsy: true })
        // .isAfter(this.startDate)
        .withMessage('endDate cannot be on or before startDate'),
    handleValidationErrors
];

//Edit a booking
router.put("/:bookingId", requireAuth, validateBooking, async (req, res) => {
    const user = req.user.id;
    const { bookingId } = req.params;
    let { startDate, endDate } = req.body;
    let now = new Date();
    let startDateTime = new Date(startDate);
    let endDateTime = new Date(endDate)

    // startDate = startDate.toString();
    // endDate = endDate.toString();

    //booking not found error - 
    let booking = await Booking.findByPk(bookingId);
    let bookings = await Booking.findAll({
        where: {
            userId: user
        },
    })
    if (!booking) res.status(404).json({ "message": "Booking couldn't be found" })

    //invalid user error
    if (booking.userId !== user) res.status(403).json({ "message": "Forbidden" });
    booking = booking.toJSON();


    //cant edit booking in past
    // if (booking.startDateTime < now) res.status(403).json({ "message": "Past bookings can't be modified" })
    if (booking.startDate < now ) return res.status(403).json({
        "message": "Past bookings can't be modified"
    })

    if (endDateTime <= startDateTime) return res.status(400).json({ "endDate": "endDate cannot be on or before startDate" })

  
    //cant book when its already booked error
    /*
    - get time for new dates
    - loop through date values that have been pushed into an array, or use reduce on an object
    - if ()
    */
    // const newStart = startDate.getTime();
    // const newEnd = endDate.getTime();

    const bookingsList = [];
    bookings.forEach(booking => {
        bookingsList.push(booking.toJSON())
    });

    bookingsList.forEach(booking => {
        //this handles start date/end date error
        // booking.startDate = booking.startDate.toJSON().slice(0, 10);
        // booking.endDate = booking.endDate.toJSON().slice(0, 10);
        // if (Date.parse(booking.endDate) <= Date.parse(booking.startDate)) return res.status(400).json({ "endDate": "endDate cannot be on or before startDate" })
        if (startDate >= endDate) return res.status(400).json({ "endDate": "endDate cannot be on or before startDate" })

        if ((booking.startDate === (startDate || endDate)) || (booking.endDate == (endDate || startDate))) return res.status(400).json({
            "message": "Sorry, this spot is already booked for the specified dates",
                "errors": {
                "startDate": "Start date conflicts with an existing booking"}
        })
    })

    // const updatedBooking = await Booking.update({
    //     where: {
    //         spotId: booking.id,
    //         userId: user,
    //         startDate,
    //         endDate,
    //         updatedAt: new Date()
    //     }
    // });


    res.status(200).json(booking );
})


//Get current user's bookings
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

//Delete a booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
    const user = req.user.id;
    const booking = await Booking.findByPk(req.params.bookingId, {
        include: [
            {
                model: Spot
            }
        ]
    })
    const now = new Date();

    //this error is working
    if (!booking) return res.status(404).json({ "message": "Booking couldn't be found" })

    //bookings that have been started cant be deleted - works
    if (booking.startDate > now) return res.status(403).json({
        "message": "Bookings that have been started can't be deleted"
    })

    
    if (booking.userId === user) {
        await booking.destroy();
        res.status(200).json({ "message": "Successfully deleted" })
    }
    
    if (booking.userId !== user) return res.status(403).json({ "message": "Forbidden" });

})


module.exports = router;