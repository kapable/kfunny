import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';

const App = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet='utf-8'/>
                <title>케이퍼니</title>
                <link rel='shortcut icon' href='/favicon.png'/>
            </Head>
            <Component />
        </>
    );
};

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default App;