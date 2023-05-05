const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, Review, ReviewImage, User, Booking, SpotImage } = require('../../db/models');

const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res) => {
    const { user } = req;
    const spotImage = await SpotImage.findByPk(req.params.imageId, { include: [{ model: Spot }] });

    if (!spotImage) {
        return res.status(404).json({
            message: "Spot Image couldn't be found",
        });
    }

    if (spotImage.Spot.ownerId !== user.id) {
        return res.status(403).json({
            message: "Forbidden",
        });
    }

    await spotImage.destroy();
    return res.json({
        message: "Successfully deleted"
    });
});

module.exports = router;