import React, { Fragment } from 'react';
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
        if(userInfo) {
            alert('로그인하지 않은 유저만 접근할 수 있습니다!');
            Router.push('/');
        }
    }, [userInfo]);
    return (
        <Fragment>
            <Head>
                <meta charSet='utf-8'/>
                <title>{`${userInfo.nickname}'s info | 케이퍼니`}</title>
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