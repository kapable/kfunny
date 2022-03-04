const express = require('express');
const morgan = require('morgan');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const db = require('./models');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const passportConfig = require('./passport');
const passport = require('passport');
const session = require('express-session');
const helmet = require('helmet');
const hpp = require('hpp');

passportConfig();
dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy');
    app.use(morgan('combined'));
    app.use(helmet());
    app.use(hpp());

    app.use(session({
        saveUninitialized: false,
        resave: false,
        secret: process.env.COOKIE_SECRET,
        proxy: true,
        cookie: {
            httpOnly: true,
            secure: true,
            domain: process.env.NODE_ENV === 'production' && '.jellinggame.net'
        }
    }));
} else {
    app.use(morgan('dev'));

    app.use(session({
        saveUninitialized: false,
        resave: false,
        secret: process.env.COOKIE_SECRET,
    }));
}
passportConfig();
app.use(cors({
    origin: true,
    credentials: true,
}));

app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());

db.sequelize.sync()
    .then(() => {
        console.log('DB Connected...');
    })
    .catch(console.error);

app.get('/', (req, res) => {
    res.send('Welcome to K-Funny Backend!');
});

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouter);

app.listen(3065, () => {
    console.log('Server is running...');
});