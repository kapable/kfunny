const express = require('express');
const morgan = require('morgan');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Welcome to K-Funny Backend!');
});

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
    console.log('Server is running...');
});