import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import ArticleCardForm from '../../components/ArticleCardForm';

const Post = () => {
    const router = useRouter();
    const { mainPosts } = useSelector((state) => state.post);
    const { id } = router.query;
    const singlePost = mainPosts.filter((post) => post.id === parseInt(id, 10))[0];
    return (
        <Fragment>
            <Head>
                <title>{singlePost.title} | 케이퍼니</title>
                <meta name='desciprtion' content={singlePost.title}/>
                <meta property='og:title' content={singlePost.title}/>
                <meta property='og:description' content={singlePost.title}/>
                <meta property='og:image' content={singlePost.Images[0].src}/>
                <meta property='og:url' content={`https://niair.xyz/post/${id}`}/>
            </Head>
            <ArticleCardForm singlePost={singlePost} />
        </Fragment>
    );
};

export default Post;