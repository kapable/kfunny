import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'antd';
import { EditOutlined, OrderedListOutlined, TagsOutlined, QuestionOutlined, ChromeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import Head from 'next/head';

const Admin = () => {
    const { userInfo } = useSelector((state) => state.user);
    
    useEffect(() => {
        if(!userInfo?.admin) {
            alert('관리자 로그인이 필요합니다!');
            Router.replace('/login');
        }
    }, [userInfo]);

    return (
        <Fragment>
            <Head>
                <title>관리자 페이지 | 케이퍼니</title>
                <meta charSet='utf-8'/>
                <link rel='main-url' href='https://niair.xyz/admin' />
                <link rel='shortcut icon' href='/favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta name="keywords" content="핫이슈, 뉴스, 최신 트렌드, 정보, 웃긴, 돈되는, 케이퍼니, 케이퍼티" />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content='https://niair.xyz/signup' />
                <meta property="og:title" content="관리자 페이지 | 케이퍼니"/>
                <meta property="og:description" content="핫이슈가 모인 최신 미디어, 케이퍼니"/>
                <meta property="og:image" content="https://ktestone.com/static/media/main-header.21ffb6bb.png"/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:alt" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta property='og:site_name' content="관리자 페이지 | 케이퍼니" />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content='https://niair.xyz/signup'/>
                <meta property="twitter:title" content="관리자 페이지 | 케이퍼니"/>
                <meta property="twitter:description" content="핫이슈가 모인 최신 미디어, 케이퍼니"/>
                <meta property="twitter:image" content="https://ktestone.com/static/media/main-header.21ffb6bb.png"/>
                <meta property="twitter:image:width" content="800"/>
                <meta property="twitter:image:height" content="400"/>
                <meta property="twitter:image:alt" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta property='og:site_name' content="관리자 페이지 | 케이퍼니" />
            </Head>
            <Row className='admin-index-row'>
                <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12} >
                    <Link href='/admin/upload'><a><EditOutlined /><br />새로운 포스트 올리기</a></Link>
                </Col>
                <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12}>
                    <Link href='/admin/posts'><a><OrderedListOutlined /><br />기존 리스트 보기</a></Link>
                </Col>
                <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12}>
                    <Link href='/admin/category'><a><TagsOutlined /><br />카테고리 편집</a></Link>
                </Col>
                <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12}>
                    <Link href='/admin/urls'><a><ChromeOutlined /><br />URL 관리</a></Link>
                </Col>
                <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12}>
                    <QuestionOutlined /><br />텅 빈 버튼
                </Col>
            </Row>
        </Fragment>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST
    });
    context.store.dispatch(END)

    await context.store.sagaTask.toPromise()
});

export default Admin;