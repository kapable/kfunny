const express = require('express');
const { Category } = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

// ADD CATEGORY
router.post('/', isLoggedIn, async (req, res, next) => { // POST /category
    try {
        const exCategory = await Category.findOne({
            where: {
                label: req.body.newCategory
            }
        });
        if(exCategory) {
            return res.status(403).send('이미 존재하는 카테고리입니다.');
        }
        await Category.create({
            label: req.body.newCategory,
            enabled: false,
        });
        const categories = await Category.findAll({
            order: [
                ['id', 'ASC'],
            ],
        });
        res.status(201).json(categories);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// LOAD CATEGORY
router.get('/', async (req, res, next) => { // GET /category
    try {
        const categories = await Category.findAll({
            order: [
                ['id', 'ASC'],
            ],
        });
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// SET CATEGORY
router.patch(`/`, isLoggedIn, async (req, res, next) => { // PATCH /category
    try {
        await Category.update({
            enabled: req.body.checked,
        }, {
            where: { label: req.body.v }
        });
        res.status(200).json({ label: req.body.v, enabled: req.body.checked });
    } catch (error) {
        console.error(error);
        next(error);
    }
});


module.exports = router;