import React, { Fragment } from 'react';
import Head from 'next/head';
import SignupForm from '../components/SignupForm';

const Signup = () => {
    return (
        <Fragment>
            <Head>
                <title>회원가입 | 케이퍼니</title>
            </Head>
            <SignupForm />
        </Fragment>
    );
};

export default Signup;