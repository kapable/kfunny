import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import ArticleCardForm from '../../components/ArticleCardForm';
import { END } from 'redux-saga';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POSTS_REQUEST, LOAD_POST_REQUEST } from '../../reducers/post';
import wrapper from '../../store/configureStore';

const Post = () => {
    const router = useRouter();
    const { id } = router.query;
    let { singlePost } = useSelector((state) => state.post);

    return (
        <Fragment>
            <Head>
                <title>{singlePost.title} | 케이퍼니</title>
                <meta name='desciprtion' content={singlePost.title}/>
                <meta property='og:title' content={singlePost.title}/>
                <meta property='og:description' content={singlePost.title}/>
                <meta property='og:image' content={singlePost.Thumbnails.length ? singlePost.Thumbnails[0]?.src : singlePost.Images[0]?.src}/>
                <meta property='og:url' content={`https://niair.xyz/post/${id}`}/>
            </Head>
            <ArticleCardForm />
        </Fragment>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST
    });
    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.params.id,
    });
    context.store.dispatch({
        type: LOAD_POSTS_REQUEST,
        data: encodeURI("최신"),
    });
    context.store.dispatch(END)

    await context.store.sagaTask.toPromise()
});

export default Post;