const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, Review, ReviewImage, User, SpotImage, Booking } = require('../../db/models');

const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res) => {
    const { user } = req;
    const reviewImage = await ReviewImage.findByPk(req.params.imageId, { include: [{ model: Review }] });

    if (!reviewImage) {
        return res.status(404).json({
            message: "Review Image couldn't be found",
        });
    }

    if (reviewImage.Review.userId !== user.id) {
        return res.status(403).json({
            message: "Forbidden",
        });
    }

    await reviewImage.destroy();
    return res.json({
        message: "Successfully deleted"
    });
});

module.exports = router;
