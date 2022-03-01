const express = require('express');
const { Post, Comment, Image, User, Category } = require('../models');
const { findOne } = require('../models/user');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

// ADD POST *Category 추가 필요!!!!!!!!!!!!!!!!!!!!
router.post('/', isLoggedIn, async (req, res, next) => { // POST /post
    try {
        const post = await Post.create({
            title: req.body.title,
            UserId: req.user.id,
        });
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: Category,
            },{
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }]
            }, {
                model: User,
                attributes: ['id', 'nickname'],
            },]
        })
        res.status(201).json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
// ADD COMMENT
router.post(`/:postId/comment`, isLoggedIn, async (req, res, next) => { // POST /1/comment
    try {
        const post = await findOne({
            where: { id: req.params.postId },
        });
        if(!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        };
        const comment = await Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id
        });
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }]
        });
        res.status(201).json(fullComment);
    } catch (error) {
        console.error(error);
        next(error);
    };
});

module.exports = router;