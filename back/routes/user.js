const express = require('express');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { User, Post, Comment } = require('../models');
const passport = require('passport');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

dotenv.config();
// GET USER
router.get(`/`, async (req, res, next) => { // GET /user
    try {
        if(req.user) {
            const fullUserWithoutPassword = await User.findOne({
                where: { id: req.user.id },
                attributes: {
                    exclude: ['password'],
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                },{
                    model: Comment,
                    attributes: ['id'],
                }]
            });
            return res.status(200).json(fullUserWithoutPassword);
        } else {
            return res.status(200).json(null);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});
// LOG IN
router.post(`/login`, isNotLoggedIn, (req, res, next) => { // POST /user/login
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            next(error);
        };
        if (info) {
            return res.status(401).send(info.reason);
        };
        return req.login(user, async (loginErr) => {
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            };
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: {
                    exclude: ['password'],
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                },{
                    model: Comment,
                    attributes: ['id'],
                }]
            });
            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req, res, next);
});
// LOG OUT
router.post(`/logout`, isLoggedIn, (req, res) => { // POST /user/logout
    req.logout();
    req.session.destroy();
    res.send('???????????? ???????????????!');
});
// SIGN UP
router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user
    try {
        const exUser = await User.findOne({ // ????????? ?????? ?????????(?????????)?????? ?????? ???,
            where: {
                email: req.body.email,
            }
        });
        if(exUser) { // ????????? ???????????? ?????????,
            return res.status(403).send('?????? ???????????? ??????????????????.'); // return?????? response 1?????? ?????????
        };
        if(req.body.password.includes(process.env.ADMIN_KEY)) {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            await User.create({
                email: req.body.email,
                nickname: req.body.nickname,
                password: hashedPassword,
                admin: true,
            });
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            await User.create({
                email: req.body.email,
                nickname: req.body.nickname,
                password: hashedPassword,
            });
        };
        res.status(200).send('??????????????? ??????????????????.');
    } catch (error) {
        console.error('BACK', error);
        next(error);
    };
});
// CHANGE NICKNAME
router.patch(`/nickname`, isLoggedIn, async (req, res, next) => { // PATCH /user/nickname
    try {
        User.update({
            nickname: req.body.nickname,
        }, {
            where: {
                id: req.user.id
            }
        });
        res.status(200).json({ nickname: req.body.nickname });
    } catch (error) {
        console.error(error);
        next(error);
    };
});
// CHANGE DESCRIPTION
router.patch(`/description`, isLoggedIn, async (req, res, next) => { // PATCH /user/description
    try {
        User.update({
            description: req.body.description,
        }, {
            where: {
                id: req.user.id
            }
        });
        res.status(200).json({ description: req.body.description });
    } catch (error) {
        console.error(error);
        next(error);
    };
});
// GET USER COMMENTS LENGTH

module.exports = router;