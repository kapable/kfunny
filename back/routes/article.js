const express = require('express');
const multer = require('multer')
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const { Article, Comment, User, Category } = require('../models');
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
    limits: { fileSize: 20 * 1024 * 1024 },
});

// ADD IMAGES // POST /article/images
router.post(`/images`, isLoggedIn, upload.array('image'), async (req, res, next) => { 
    try {
        res.status(200).json(req.files.map((v) => process.env.NODE_ENV === 'production' ? `https://images.doodniairling.kr/${v.key}`.replace(/\/original\//, '/resized/') : `${process.env.DEV_BACKURL}/${v.filename}`));
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// ADD ARTICLE // POST /article
router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        const article = await Article.create({
            UserId: parseInt(req.user.id, 10),
            title: req.body.title,
            contents: req.body.contents,
        });
        if(req.body.category) {
            const category = await Category.findOne({ where: { label: req.body.category } });
            await article.addCategory(category);
        };
        const fullArticle = await Article.findOne({
            where: { id: article.id },
            attributes: ['id'],
            include: [{
                model: Category,
                attributes: ['label', 'enabled'],
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
        });
        res.status(201).json(fullArticle);
    } catch (error) {
        console.error(error);
        next(error);
    };
});

// LOAD ARTICLE // GET /article/:articleId
router.get(`/:articleId`, async (req, res, next) => {
    try {
        const article = await Article.findOne({
            where: { id: parseInt(req.params.articleId, 10) },
        });
        if(!article) {
            return res.status(404).send('존재하지 않는 게시글입니다ㅠㅠ');
        };
        let fullArticle = await Article.findOne({
            where: { id: parseInt(article.id, 10) },
            include: [{
                model: Category,
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
        res.status(200).json(fullArticle);
    } catch (error) {
        console.error(error);
        next(error);
    };
});

// REMOVE ARTICLE // DELETE /article/:articleId
router.delete(`/:articleId`, isLoggedIn, async (req, res, next) => {
    try {
        await Article.destroy({
            where: {
                id: parseInt(req.params.articleId, 10),
            },
        });
        res.status(200).json({ ArticleId: parseInt(req.params.articleId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;