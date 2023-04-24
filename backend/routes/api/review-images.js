const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, Review, ReviewImage, User, SpotImage, Booking } = require('../../db/models');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {

    const { user } = req.user;
    const id = req.params.imageId;

    if (user) {
        const image = await ReviewImage.findByPk(id, {
            include: [
                {
                     model: Review 
                }
            ]
        });
        if (!image) return res.status(404).json({ "message": "Spot Image couldn't be found" })

        if (user.id === image.Review.userId) {

            await image.destroy();

            return res.status(200).json({ "message": "Successfully deleted" })
        }

        return res.status(403).json({ "message": "Forbidden" })

    }

    return res.json({
        message: "Authentication required"
    })

})

module.exports = router;
