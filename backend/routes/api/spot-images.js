const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, Review, ReviewImage, User, Booking, SpotImage } = require('../../db/models');

const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { imageId } = req.params;

    let image = await SpotImage.findByPk(req.params.imageId, {
        include: [
            {
                model: Spot
            }
        ]
    })
    image = image.toJSON();
    if (!image.SpotImage.imageId) return res.status(404).json({ "message": "Spot Image couldn't be found" })
    if (image.userId !== userId) return res.status(403).json({ "message": "Forbidden" });

    await image.destroy();
    return res.status(200).json({ "message": "Successfully deleted" })
})

module.exports = router;