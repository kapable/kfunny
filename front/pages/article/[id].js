import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POSTS_REQUEST, LOAD_POST_REQUEST, SET_COUPANG_COOKIE } from '../../reducers/post';
import wrapper from '../../store/configureStore';
import { LOAD_URLS_REQUEST } from '../../reducers/url';
import ContentsCardForm from '../../components/ContentsCardForm';

const Article = () => {
    const router = useRouter();
    const { id } = router.query;
    // let { singlePost } = useSelector((state) => state.post);

    return (
        <Fragment>
            <Head>
                <title>ARTICLE | 케이퍼니</title>
                <meta charSet='utf-8'/>
                <meta name='desciprtion' content={'TITLE'}/>
                <link rel='shortcut icon' href='/favicon.png'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="keywords" content="핫이슈, 뉴스, 최신 트렌드, 정보, 웃긴, 돈되는, 케이퍼니, 케이퍼티" />

                {/* <!-- Open Graph / Facebook --> */}
                {/* <meta property='og:title' content={`${singlePost.title} | 케이퍼니`}/>
                <meta property='og:description' content={singlePost.title}/>
                <meta property='og:image' content={singlePost.Thumbnails.length ? singlePost.Thumbnails[0]?.src : singlePost.Images[0]?.src}/>
                <meta property='og:url' content={`https://niair.xyz/post/${id}`}/>
                <meta property="og:type" content="website"/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:alt" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta property='og:site_name' content={`${singlePost.title} | 케이퍼니`} /> */}

                {/* <!-- Twitter --> */}
                {/* <meta property="twitter:card" content="summary_large_image"/>
                <meta property='twitter:title' content={`${singlePost.title} | 케이퍼니`}/>
                <meta property='twitter:description' content={singlePost.title}/>
                <meta property='twitter:image' content={singlePost.Thumbnails.length ? singlePost.Thumbnails[0]?.src : singlePost.Images[0]?.src}/>
                <meta property='twitter:url' content={`https://niair.xyz/post/${id}`}/>
                <meta property="twitter:type" content="website"/>
                <meta property="twitter:image:width" content="800"/>
                <meta property="twitter:image:height" content="400"/>
                <meta property="twitter:image:alt" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta property='twitter:site_name' content={`${singlePost.title} | 케이퍼니`} /> */}
            </Head>
            <ContentsCardForm />
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
    // context.store.dispatch({
    //     type: LOAD_POST_REQUEST,
    //     data: context.params.id,
    // });
    // context.store.dispatch({
    //     type: LOAD_POSTS_REQUEST,
    //     data: encodeURI("HOT 이슈"),
    // });
    context.store.dispatch({
        type: LOAD_URLS_REQUEST
    });
    context.store.dispatch({
        type: SET_COUPANG_COOKIE,
        data: (context.req.cookies?.coupang === "true")
    });
    context.store.dispatch(END)

    await context.store.sagaTask.toPromise()
});

export default Article;