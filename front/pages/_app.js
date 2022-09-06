import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import '../css/basic.css';
import '../css/admin.css';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';
import { CookiesProvider } from 'react-cookie';
import Head from 'next/head';
React.useLayoutEffect = React.useEffect;

const App = ({ Component }) => {
    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = (url) => { gtag.pageview(url) };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        };
    }, [router.events]);

    return (
        <Fragment>
            <Head>
                <meta name="naver-site-verification" content="54431b6c522b48ef23ca288623f778376899e4d2" />
            </Head>
            <CookiesProvider>
                <AppLayout>
                    <Component />
                </AppLayout>
            </CookiesProvider>
        </Fragment>
    );
};

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(App);