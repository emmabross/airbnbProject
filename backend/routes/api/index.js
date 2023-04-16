const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require('../../utils/auth.js');

// router.use(restoreUser);
//if i get a bug comment this in and the other one out^

// keep the restoreUser middleware connected before any other middleware or route handlers are connected to the router.This will allow all route handlers connected to this router to retrieve the current user on the Request object as req.user.If there is a valid current user session, then req.user will be set to the User in the database.If there is NO valid current user session, then req.user will be set to null.
router.get(
    '/restore-user',
    (req, res) => {
        return res.json(req.user);
    }
);

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

//This will test the setTokenCookie function by getting the demo user and calling setTokenCookie.
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'FakeJessie'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user: user });
// });

module.exports = router;
