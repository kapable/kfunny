const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Article, User, Comment, Category } = require('../models');

// LOAD ARTICLES // GET /articles/:categoryId
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
        const articles = await Article.findAll({
            where: globalWhere,
            attributes: { exclude: ['updatedAt'] },
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
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }]
            }]
        });
        res.status(200).json(articles);
    } catch (error) {
        console.error(error);
        next(error);
    };
});

module.exports = router;