import React, { Fragment } from 'react';
import Head from 'next/head';
import UserProfile from '../components/UserProfile';

const Profile = () => {
    return (
        <Fragment>
            <Head>
                <title>회원가입 | 케이퍼니</title>
            </Head>
            <div>Profile</div>
        </Fragment>
    );
};

export default Profile;