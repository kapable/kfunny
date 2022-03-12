const express = require('express');
const multer = require('multer')
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const { Post, Comment, Image, User, Category, Thumbnail } = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

try {
    fs.accessSync('uploads');
} catch (error) {
    console.log('uploads 폴더가 존재하지 않아 생성합니다');
    fs.mkdirSync('uploads');
};
AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
});
const upload = multer({
    storage:
    process.env.NODE_ENV === 'production'
        ? multerS3({
        s3: new AWS.S3(),
        bucket: 'kfunny-image-s3',
        key(req, file, cb) {
            cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`)
        },
        contentType(req, file, cb) {
            const extension = path.extname(file.originalname).replace('.','');
            cb(null, `image/${extension}`);
        },
    }) : multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            done(null, basename + '_' + new Date().getTime() + ext);
        },
    }),
    // storage: multer.diskStorage({
    //     destination(req, file, done) {
    //         done(null, 'uploads');
    //     },
    //     filename(req, file, done) {
    //         const ext = path.extname(file.originalname);
    //         const basename = path.basename(file.originalname, ext);
    //         done(null, basename + '_' + new Date().getTime() + ext);
    //     },
    // }),
    // storage: multerS3({
    //     s3: new AWS.S3(),
    //     bucket: 'kfunny-image-s3',
    //     key(req, file, cb) {
    //         cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`)
    //     },
    //     contentType(req, file, cb) {
    //         const extension = path.extname(file.originalname).replace('.','');
    //         cb(null, `image/${extension}`);
    //     },
    // }),
    limits: { fileSize: 20 * 1024 * 1024 },
});

// ADD POST
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => { // POST /post
    try {
        const post = await Post.create({
            title: req.body.title,
            UserId: req.user.id,
        });
        if(req.body.category) {
            const category = await Category.findOne({ where: { label: req.body.category } });
            await post.addCategory(category);
        }
        if (req.body.image) { // if the post contains image file(s)
            if (Array.isArray(req.body.image)) { // Multiple images Array
                const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
                await post.addImages(images);
            } else { // Single image file
                const image = await Image.create({ src: req.body.image });
                await post.addImages(image);
            }
        }
        if (req.body.thumbnail) {
            const thumbnail = await Thumbnail.create({ src: req.body.thumbnail });
            await post.addThumbnails(thumbnail);
        }
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: Category,
                attributes: ['label', 'enabled'],
            },{
                model: Image,
            }, {
                model: Thumbnail,
            },{
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
// LOAD POST
router.get(`/:postId`, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: parseInt(req.params.postId, 10) },
        });
        if(!post) {
            return res.status(404).send('존재하지 않는 게시글입니다ㅠㅠ');
        };
        const fullPost = await Post.findOne({
            where: { id: parseInt(post.id) },
            include: [{
                model: Category,
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
        res.status(200).json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    };
});
// REMOVE POST
router.delete(`/:postId`, isLoggedIn, async (req, res, next) => { // DELETE /post/1
    try {
        await Post.destroy({
            where: {
                id: req.params.postId,
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
// ADD IMAGES
router.post(`/images`, isLoggedIn, upload.array('image'), async (req, res, next) => { // POST /post/images
    try {
        res.status(200).json(req.files.map((v) => process.env.NODE_ENV === 'production' ? `https://images.niair.xyz/${v.key}` : `${process.env.DEV_BACKURL}/${v.filename}`));
    } catch (error) {
        console.error(error);
        next(error);
    }
});
// ADD THUMBNAIL
router.post(`/thumbnail`, isLoggedIn, upload.array('thumbnail'), async (req, res, next) => { // POST /post/thumbnail
    try {
        res.status(200).json(req.files.map((v) => process.env.NODE_ENV === 'production' ? `https://images.niair.xyz/${v.key}` : `${process.env.DEV_BACKURL}/${v.filename}`));
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;