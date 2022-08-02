import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { BackTop, Tabs, Pagination } from 'antd';
import HomeCardForm from '../components/HomeCardForm';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_POSTS_REQUEST, RESET_KEYWORD_POSTS } from '../reducers/post';
import { LOAD_CATEGORIES_REQUEST } from '../reducers/category';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { END } from 'redux-saga';
import wrapper from '../store/configureStore';
import axios from 'axios';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';

const { TabPane } = Tabs;

const CategoryIndex = () => {
    const router = useRouter();
    const { category } = router.query;
    const dispatch = useDispatch();
    const { mainPosts, hasMorePosts } = useSelector((state) => state.post);
    const { postCategories } = useSelector((state) => state.category);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if(!postCategories.map(cat => cat.label).includes(category)) {
            alert('존재하지 않는 카테고리입니다!');
            return Router.replace('/');
        }
    }, [postCategories, category]);

    const onChangeCategory = useCallback((category) => {
        gtag.event({ action: "Click another-keyword Tab", category: "Paging", label: "Home page" });
        category === postCategories[0].label
        ? (Router.push('/'))
        : (Router.push(`/${category}`))
    }, []);

    const onPageChange = useCallback((e) => {
        setCurrentPage(e)
    }, []);

    useEffect(() => {
        if(currentPage % 5 === 0 && hasMorePosts) {
            const lastId = mainPosts[mainPosts.length - 1]?.id;
            return () => dispatch({
                type: LOAD_POSTS_REQUEST,
                data: category,
                lastId
            });
        }
    }, [currentPage, hasMorePosts, mainPosts, category]);
    
    return (
        <Fragment>
            <Head>
                <title>케이퍼니</title>
                <link rel='main-url' href='https://niair.xyz' />
                <link rel='shortcut icon' href='/favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta name="keywords" content="핫이슈, 뉴스, 최신 트렌드, 정보, 웃긴, 돈되는, 케이퍼니, 케이퍼티" />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content='https://niair.xyz' />
                <meta property="og:title" content='케이퍼니'/>
                <meta property="og:description" content="핫이슈가 모인 최신 미디어, 케이퍼니"/>
                <meta property="og:image" content="https://ktestone.com/static/media/main-header.21ffb6bb.png"/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:alt" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta property='og:site_name' content='케이퍼니' />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content="https://niair.xyz/login"/>
                <meta property="twitter:title" content='케이퍼니'/>
                <meta property="twitter:description" content="핫이슈가 모인 최신 미디어, 케이퍼니"/>
                <meta property="twitter:image" content="https://ktestone.com/static/media/main-header.21ffb6bb.png"/>
                <meta property="twitter:image:width" content="800"/>
                <meta property="twitter:image:height" content="400"/>
                <meta property="twitter:image:alt" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta property='og:site_name' content='케이퍼니' />
            </Head>

            {/* Category Bar */}
            <Tabs tabPosition='top' size='default' type='line' onChange={onChangeCategory} activeKey={category}>
                {postCategories.map((category, _) => {
                    if(category.enabled) {
                        return (<TabPane key={category.label} tab={`${category.label}`}>
                                    <HomeCardForm posts={mainPosts.slice((currentPage-1)*10, (currentPage-1)*10+10)} keyword={`${category.label}`}/>
                                </TabPane>)
                    }
                })}
            </Tabs>
            <Pagination
                className='main-pagination'
                current={currentPage}
                showSizeChanger={false}
                total={currentPage % 5 === 0 && hasMorePosts ? mainPosts.length+1 : mainPosts.length}
                onChange={onPageChange}
                defaultPageSize={10} />
            <BackTop />
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
        type: RESET_KEYWORD_POSTS,
    });
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST
    });
    context.store.dispatch({
        type: LOAD_CATEGORIES_REQUEST
    });
    context.store.dispatch({
        type: RESET_KEYWORD_POSTS,
    });
    context.store.dispatch({
        type: LOAD_POSTS_REQUEST,
        data: encodeURI(context.params.category),
    });
    context.store.dispatch(END)

    await context.store.sagaTask.toPromise()
});

export default CategoryIndex;