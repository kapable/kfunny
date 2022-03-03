const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Post, User, Image, Comment, Category } = require('../models');

router.get(`/:category`, async (req, res, next) => {
    try {
        let categoryWhere = {};
        if(req.params.category === "최신") {
            categoryWhere = {};
        } else {
            categoryWhere.label = req.params.category;
        }
        const posts = await Post.findAll({
            limit: 10,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC'],
            ],
            include: [{
                model: Category,
                where: categoryWhere,
                attributes: ['id', 'label', 'enabled']
            }, {
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }]
            }]
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    };
});

module.exports = router;