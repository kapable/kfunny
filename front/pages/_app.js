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
            <Head>
                <title>케이퍼니</title>
                {/* <link rel='main-url' href='https://niair.xyz' />
                <link rel='shortcut icon' href='/favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta name="keywords" content="핫이슈, 뉴스, 최신 트렌드, 정보, 웃긴, 돈되는, 케이퍼니, 케이퍼티" /> */}

                {/* <!-- Open Graph / Facebook --> */}
                {/* <meta property="og:type" content="website"/>
                <meta property="og:url" content='https://niair.xyz' />
                <meta property="og:title" content='케이퍼니'/> */}
                <meta property="og:description" content="핫이슈가 모인 최신 미디어, 케이퍼니"/>
                <meta property="og:image" content="https://ktestone.com/static/media/main-header.21ffb6bb.png"/>
                {/* <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:alt" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta property='og:site_name' content='케이퍼니' /> */}

                {/* <!-- Twitter --> */}
                {/* <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content="https://niair.xyz/login"/>
                <meta property="twitter:title" content='케이퍼니'/>
                <meta property="twitter:description" content="핫이슈가 모인 최신 미디어, 케이퍼니"/>
                <meta property="twitter:image" content="https://ktestone.com/static/media/main-header.21ffb6bb.png"/>
                <meta property="twitter:image:width" content="800"/>
                <meta property="twitter:image:height" content="400"/>
                <meta property="twitter:image:alt" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta property='og:site_name' content='케이퍼니' /> */}
            </Head>
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