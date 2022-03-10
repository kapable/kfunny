import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import '../css/basic.css';
import '../css/admin.css';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
React.useLayoutEffect = React.useEffect;

const App = ({ Component }) => {
    return (
        <Fragment>
            <AppLayout>
                <Component />
            </AppLayout>
        </Fragment>
    );
};

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(App);