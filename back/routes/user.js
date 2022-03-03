const express = require('express');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { User, Post, Image, Comment } = require('../models');
const passport = require('passport');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

dotenv.config();
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
                },]
            });
            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req, res, next);
});
// LOG OUT
router.post(`/logout`, isLoggedIn, (req, res) => { // POST /user/logout
    req.logout();
    req.session.destroy();
    res.send('로그아웃 되었습니다!');
});
// SIGN UP
router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user
    try {
        const exUser = await User.findOne({ // 기존에 있는 아이디(이메일)인지 찾은 후,
            where: {
                email: req.body.email,
            }
        });
        if(exUser) { // 기존에 사용자가 있다면,
            return res.status(403).send('이미 사용중인 이메일입니다.'); // return으로 response 1개만 보내기
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
        res.status(200).send('회원가입에 성공했습니다.');
    } catch (error) {
        console.error('BACK', error);
        next(error);
    };
});

module.exports = router;