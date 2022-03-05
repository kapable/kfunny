import React, { Fragment, useEffect } from 'react';
import Head from 'next/head';
import SignupForm from '../components/SignupForm';
import { END } from 'redux-saga';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import { useSelector } from 'react-redux';
import Router from 'next/router';

const Signup = () => {
    const { userInfo } = useSelector((state) => state.user);
    useEffect(() => {
        if(userInfo) {
            Router.push('/');
        }
    }, [userInfo]);
    return (
        <Fragment>
            <Head>
                <title>회원가입 | 케이퍼니</title>
            </Head>
            <SignupForm />
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

export default Signup;