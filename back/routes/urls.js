const express = require('express');
const router = express.Router();
const { Url } = require('../models');
const { isLoggedIn } = require('./middlewares');

// ADD URL
router.post(`/`, isLoggedIn, async (req, res, next) => { // POST /urls
    try {
        const exUrl = await Url.findOne({
            where: {
                name: req.body.name,
            }
        });
        if(exUrl) {
            return res.status(403).send('이미 존재하는 이름의 Url 입니다.');
        };
        await Url.create({
            name: req.body.name,
            link: req.body.link,
        });
        res.status(200).send('Url 등록에 성공했습니다!');
    } catch (error) {
        console.error(error);
        next(error);
    };
});

// CHANGE URL
router.patch(`/`, isLoggedIn, async (req, res, next) => { // PATCH /urls
    try {
        Url.update({
            link: req.body.link,
        }, {
            where: {
                name: req.body.name
            }
        });
        res.status(200).json({ name: req.body.name, link: req.body.link });
    } catch (error) {
        console.error(error);
        next(error);
    };
});

// LOAD URLS
router.get(`/`, async (req, res, next) => { // GET /urls
    try {
        const url = await Url.findAll({
            where: {},
            attributes: ['id', 'name', 'link'],
            order: [
                ['createdAt', 'ASC'],
            ]
        });
        res.status(200).json(url);
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;