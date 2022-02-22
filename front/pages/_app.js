import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import '../css/basic.css';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const App = ({ Component }) => {
    return (
        <Fragment>
            <Head>
                <meta charSet='utf-8'/>
                <title>케이퍼니</title>
                <link rel='shortcut icon' href='/favicon.png'/>
            </Head>
            <AppLayout>
                <Component />
            </AppLayout>
        </Fragment>
    );
};

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default App;