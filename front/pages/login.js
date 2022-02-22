import React, { Fragment } from 'react'
import Head from 'next/head';
import LoginForm from '../components/LoginForm';

const Login = () => {
    return (
        <Fragment>
            <Head>
                <title>로그인 | 케이퍼니</title>
            </Head>
            <LoginForm />
        </Fragment>
    );
};

export default Login;