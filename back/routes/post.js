const express = require('express');
const multer = require('multer')
const path = require('path');
const fs = require('fs');
const { Post, Comment, Image, User, Category } = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

// ADD POST
router.post('/', isLoggedIn, async (req, res, next) => { // POST /post
    try {
        const post = await Post.create({
            title: req.body.title,
            UserId: req.user.id,
        });
        if(req.body.category) {
            const category = await Category.findOne({ where: { label: req.body.category } });
            await post.addCategory(category);
        }
        if (req.body.imagePaths) { // if the post contains image file(s)
            if (Array.isArray(req.body.imagePaths)) { // Multiple images Array
                const images = await Promise.all(req.body.imagePaths.map((image) => Image.create({ src: image })));
                await post.addImages(images);
            } else { // Single image file
                const image = await Image.create({ src: req.body.imagePaths });
                await post.addImages(image);
            }
        }
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: Category,
                attributes: ['label', 'enabled'],
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
// REMOVE POST
router.delete(`/:postId`, isLoggedIn, async (req, res, next) => { // DELETE /post/1
    try {
        console.log(req.user);
        await Post.destroy({
            where: {
                id: req.params.postId,
                UserId: req.user.id
            },
        });
        res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});
// ADD COMMENT
router.post(`/:postId/comment`, isLoggedIn, async (req, res, next) => { // POST /1/comment
    try {
        const post = await Post.findOne({
            where: { id: parseInt(req.params.postId, 10) },
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