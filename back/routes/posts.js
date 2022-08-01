const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Post, User, Image, Comment, Category, Thumbnail } = require('../models');

router.get(`/:category`, async (req, res, next) => {
    try {
        let globalWhere = {};
        let categoryWhere = {};
        if(req.params.category === "HOT 이슈") {
            categoryWhere = {};
        } else {
            categoryWhere.label = req.params.category;
        }
        if (parseInt(req.query.lastId, 10)) {
            globalWhere.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
        };
        const posts = await Post.findAll({
            where: globalWhere,
            limit: 51,
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
                model: Thumbnail,
            },{
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }]
            }]
        });
        res.status(200).json(posts);
    } catch (error) {
        console.log('SERVER GET POSTS');
        console.error(error);
        next(error);
    };
});

module.exports = router;