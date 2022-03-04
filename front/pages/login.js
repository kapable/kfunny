import React, { Fragment, useEffect } from 'react'
import Head from 'next/head';
import LoginForm from '../components/LoginForm';
import { END } from 'redux-saga';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import Router from 'next/router';
import { useSelector } from 'react-redux';

const Login = () => {
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
                <title>로그인 | 케이퍼니</title>
            </Head>
            <LoginForm />
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

export default Login;