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