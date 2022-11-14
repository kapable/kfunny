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
import Router from 'next/router';
import * as gtag from '../lib/gtag';
import { LOAD_ARTICLES_REQUEST } from '../reducers/article';

const { TabPane } = Tabs;

const Home = () => {
    const dispatch = useDispatch();
    const { mainPosts, hasMorePosts } = useSelector((state) => state.post);
    const { mainArticles, hasMoreArticles } = useSelector((state) => state.article);
    const { postCategories } = useSelector((state) => state.category);
    const [currentCategory, setCurrentCategory] = useState('HOT 이슈');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentArticlePage, setCurrentArticlePage] = useState(1);

    const onChangeCategory = useCallback((category) => {
        gtag.event({ action: "Click another-keyword Tab", category: "Paging", label: "Home page" });
        Router.push(`/${category}`);
        // setCurrentCategory(category);
        // dispatch({
        //     type: RESET_KEYWORD_POSTS,
        // });
        // dispatch({
        //     type: LOAD_POSTS_REQUEST,
        //     data: category,
        // });
        // setCurrentPage(1);
    }, []);

    const onPageChange = useCallback((e) => {
        setCurrentPage(e)
    }, []);

    const onArticlePageChange = useCallback((e) => {
        setCurrentArticlePage(e)
    }, []);

    useEffect(() => {
        if(currentPage % 5 === 0 && hasMorePosts) {
            const lastId = mainPosts[mainPosts.length - 1]?.id;
            return () => dispatch({
                type: LOAD_POSTS_REQUEST,
                data: currentCategory,
                lastId
            });
        }
    }, [currentPage, hasMorePosts, mainPosts, currentCategory]);

    useEffect(() => {
        if(currentArticlePage % 5 === 0 && hasMoreArticles) {
            const lastId = mainArticles[mainArticles.length - 1]?.id;
            return () => dispatch({
                type: LOAD_ARTICLES_REQUEST,
                data: currentCategory,
                lastId
            });
        }
    }, [currentArticlePage, hasMoreArticles, mainArticles, currentCategory]);
    
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

            {/* SNS POST CONTENTS */}
            <Tabs tabPosition='top' size='default' type='line' onChange={onChangeCategory}>
                {postCategories.map((category, _) => {
                    if(category.enabled) {
                        return (<TabPane key={category.label} tab={`${category.label}`}>
                                    <HomeCardForm shape={"post"} posts={mainPosts.slice((currentPage-1)*10, (currentPage-1)*10+10)} keyword={`${category.label}`}/>
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

            {/* NEWS ARTICLE CONTENTS */}
            <Tabs tabPosition='top' size='default' type='line' onChange={onChangeCategory}>
                {postCategories.map((category, _) => {
                    if(category.enabled) {
                        return (<TabPane key={category.label} tab={`${category.label}`}>
                                    <HomeCardForm shape={"article"} posts={mainArticles.slice((currentArticlePage-1)*10, (currentArticlePage-1)*10+10)} keyword={`${category.label}`}/>
                                </TabPane>)
                    }
                })}
            </Tabs>
            <Pagination
                className='main-pagination'
                current={currentArticlePage}
                showSizeChanger={false}
                total={currentArticlePage % 5 === 0 && hasMoreArticles ? mainArticles.length+1 : mainArticles.length}
                onChange={onArticlePageChange}
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
        data: encodeURI("HOT 이슈"),
    });
    context.store.dispatch({
        type: LOAD_ARTICLES_REQUEST,
        data: encodeURI("HOT 이슈"),
    });
    context.store.dispatch(END)

    await context.store.sagaTask.toPromise()
});

export default Home;