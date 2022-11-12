import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LOAD_CATEGORIES_REQUEST } from '../../reducers/category';
import Router from 'next/router';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../../store/configureStore';
import Head from 'next/head';
import ArticleUploadEditor from '../../components/ArticleUploadEditor';

const UploadArticle = () => {
    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        if(!(userInfo?.admin)) {
            alert('관리자 로그인이 필요합니다!');
            Router.replace('/login');
        }
    }, [userInfo]);
    
    return (
        <Fragment>
            <Head>
                <title>게시물 업로드 | 케이퍼니</title>
                <meta charSet='utf-8'/>
                <link rel='main-url' href='https://niair.xyz/admin/uploadArticle' />
                <link rel='shortcut icon' href='/favicon.png'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta name="keywords" content="핫이슈, 뉴스, 최신 트렌드, 정보, 웃긴, 돈되는, 케이퍼니, 케이퍼티" />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content='https://niair.xyz/admin/uploadArticle' />
                <meta property="og:title" content="게시물 업로드 | 케이퍼니"/>
                <meta property="og:description" content="핫이슈가 모인 최신 미디어, 케이퍼니"/>
                <meta property="og:image" content="https://ktestone.com/static/media/main-header.21ffb6bb.png"/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:alt" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta property='og:site_name' content="게시물 업로드 | 케이퍼니" />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content='https://niair.xyz/admin/uploadArticle'/>
                <meta property="twitter:title" content="게시물 업로드 | 케이퍼니"/>
                <meta property="twitter:description" content="핫이슈가 모인 최신 미디어, 케이퍼니"/>
                <meta property="twitter:image" content="https://ktestone.com/static/media/main-header.21ffb6bb.png"/>
                <meta property="twitter:image:width" content="800"/>
                <meta property="twitter:image:height" content="400"/>
                <meta property="twitter:image:alt" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta property='og:site_name' content="게시물 업로드 | 케이퍼니" />
            </Head>
            <ArticleUploadEditor />
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
        type: LOAD_CATEGORIES_REQUEST
    });
    context.store.dispatch(END)

    await context.store.sagaTask.toPromise()
});

export default UploadArticle;