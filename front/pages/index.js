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
import * as gtag from '../lib/gtag';
import { CaretDownOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const Home = () => {
    const dispatch = useDispatch();
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
    const { postCategories } = useSelector((state) => state.category);
    const [currentCategory, setCurrentCategory] = useState('HOT 이슈');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsLength, setPostsLength] = useState(mainPosts.length);

    const onChangeCategory = useCallback((category) => {
        gtag.event({ action: "Click another-keyword Tab", category: "Paging", label: "Home page" });
        setCurrentCategory(category);
        dispatch({
            type: RESET_KEYWORD_POSTS,
        });
        dispatch({
            type: LOAD_POSTS_REQUEST,
            data: category,
        });
    }, []);

    const onPageChange = useCallback((e) => {
        setCurrentPage(e)
    }, []);

    useEffect(() => {
        if(currentPage % 5 === 0 && hasMorePosts) {
            const lastId = mainPosts[mainPosts.length - 1]?.id;
            return dispatch({
                type: LOAD_POSTS_REQUEST,
                data: currentCategory,
                lastId
            });
        }
    }, [currentPage, hasMorePosts, loadPostsLoading, mainPosts, currentCategory]);

    useState(() => {
        setPostsLength(mainPosts.length);
    }, [mainPosts]);

    // useEffect(() => {
    //     function onScroll() {
    //         if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500) {
    //             if(hasMorePosts && !loadPostsLoading) {
    //                 const lastId = mainPosts[mainPosts.length - 1]?.id;
    //                 dispatch({
    //                     type: LOAD_POSTS_REQUEST,
    //                     data: currentCategory,
    //                     lastId
    //                 });
    //             };
    //         };
    //     };
    //     window.addEventListener('scroll', onScroll);
    //     return () => {
    //         window.removeEventListener('scroll', onScroll);
    //     };
    // }, [hasMorePosts, loadPostsLoading, mainPosts, currentCategory]);
    
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
            <Tabs tabPosition='top' size='default' type='line' onChange={onChangeCategory}>
                {postCategories.map((category, _) => {
                    if(category.enabled) {
                        return (<TabPane key={category.label} tab={`${category.label}`}>
                                    <HomeCardForm posts={mainPosts.slice((currentPage-1)*10, (currentPage-1)*10+10)} keyword={`${category.label}`}/>
                                </TabPane>)
                    }
                })}
            </Tabs>
            <Pagination className='main-pagination' showSizeChanger={false} total={mainPosts.length} onChange={onPageChange} defaultPageSize={10} />

            {/* Scroll Down guide */}
            {/* {hasMorePosts
            ? (
                <div className='main-scroll-down-div'>
                    <h3>스크롤해서 더보기</h3>
                    <CaretDownOutlined />
                </div>
            )
            : (
                <div className='main-scroll-down-div'>
                    <h3>아티클이 더이상 없어요!</h3>
                    <VerticalAlignBottomOutlined />
                </div>
            )
            } */}
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
    context.store.dispatch(END)

    await context.store.sagaTask.toPromise()
});

export default Home;