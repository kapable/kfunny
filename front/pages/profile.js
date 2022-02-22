import React, { Fragment } from 'react';
import Head from 'next/head';
import UserProfile from '../components/UserProfile';

const Profile = () => {
    return (
        <Fragment>
            <Head>
                <title>내 정보 | 케이퍼니</title>
            </Head>
            <UserProfile />
        </Fragment>
    );
};

export default Profile;