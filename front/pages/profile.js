import React, { Fragment, useEffect } from 'react';
import Head from 'next/head';
import UserProfile from '../components/UserProfile';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import Router from 'next/router';

const Profile = () => {
    const { userInfo } = useSelector((state) => state.user);
    useEffect(() => {
        if(!(userInfo && userInfo.id)) {
            Router.replace('/');
        }
    }, [userInfo && userInfo.id]);
    return (
        <Fragment>
            <Head>
                <meta charSet='utf-8'/>
                <title>{`${userInfo.nickname}'s info | 케이퍼니`}</title>
                <link rel='main-url' href='https://niair.xyz/profile' />
                <link rel='shortcut icon' href='/favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta name="keywords" content="핫이슈, 뉴스, 최신 트렌드, 정보, 웃긴, 돈되는, 케이퍼니, 케이퍼티" />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content='https://niair.xyz/profile' />
                <meta property="og:title" content={`${userInfo.nickname}'s info | 케이퍼니`}/>
                <meta property="og:description" content="핫이슈가 모인 최신 미디어, 케이퍼니"/>
                <meta property="og:image" content="https://ktestone.com/static/media/main-header.21ffb6bb.png"/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:alt" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta property='og:site_name' content={`${userInfo.nickname}'s info | 케이퍼니`} />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content='https://niair.xyz/profile'/>
                <meta property="twitter:title" content={`${userInfo.nickname}'s info | 케이퍼니`}/>
                <meta property="twitter:description" content="핫이슈가 모인 최신 미디어, 케이퍼니"/>
                <meta property="twitter:image" content="https://ktestone.com/static/media/main-header.21ffb6bb.png"/>
                <meta property="twitter:image:width" content="800"/>
                <meta property="twitter:image:height" content="400"/>
                <meta property="twitter:image:alt" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta property='og:site_name' content={`${userInfo.nickname}'s info | 케이퍼니`} />
            </Head>
            <UserProfile />
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
    context.store.dispatch(END)

    await context.store.sagaTask.toPromise()
});

export default Profile;