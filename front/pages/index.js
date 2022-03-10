import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import HomeCardForm from '../components/HomeCardForm';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_POSTS_REQUEST, RESET_KEYWORD_POSTS } from '../reducers/post';
import { LOAD_CATEGORIES_REQUEST } from '../reducers/category';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { END } from 'redux-saga';
import wrapper from '../store/configureStore';
import axios from 'axios';

const { TabPane } = Tabs;

const Home = () => {

    const dispatch = useDispatch();
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
    const { postCategories } = useSelector((state) => state.category);
    const [currentCategory, setCurrentCategory] = useState('HOT 이슈');

    const onChangeCategory = useCallback((category) => {
        setCurrentCategory(category);
        dispatch({
            type: RESET_KEYWORD_POSTS,
        });
        dispatch({
            type: LOAD_POSTS_REQUEST,
            data: category,
        });
    }, []);

    useEffect(() => {
        function onScroll() {
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500) {
                if(hasMorePosts && !loadPostsLoading) {
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        data: currentCategory,
                        lastId
                    });
                };
            };
        };
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMorePosts, loadPostsLoading, mainPosts, currentCategory]);
    
    return (
        <Fragment>
            <Tabs tabPosition='top' size='default' type='line' onChange={onChangeCategory}>
                {postCategories.map((category, _) => {
                    if(category.enabled) {
                        return (<TabPane key={category.label} tab={`${category.label}`}>
                                    <HomeCardForm posts={mainPosts} keyword={`${category.label}`}/>
                                </TabPane>)
                    }
                })}
            </Tabs>
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