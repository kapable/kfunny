import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import HomeCardForm from '../components/HomeCardForm';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_POSTS_REQUEST, RESET_KEYWORD_POSTS } from '../reducers/post';
import { LOAD_CATEGORIES_REQUEST } from '../reducers/category';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const { TabPane } = Tabs;

const Home = () => {
    useEffect(() => {
        dispatch({
            type: LOAD_MY_INFO_REQUEST
        });
        dispatch({
            type: LOAD_CATEGORIES_REQUEST
        });
    }, []);

    const dispatch = useDispatch();
    const { keywordPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
    const { postCategories } = useSelector((state) => state.category);
    const [currentCategory, setCurrentCategory] = useState('최신');
    const onCategoryChange = useCallback((category) => {
        setCurrentCategory(category);
    }, []);
    useEffect(() => {
        dispatch({
            type: RESET_KEYWORD_POSTS,
        });
        dispatch({
            type: LOAD_POSTS_REQUEST,
            data: currentCategory,
        });
    }, [currentCategory]);

    useEffect(() => {
        function onScroll() {
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500) {
                if(hasMorePosts && !loadPostsLoading) {
                    const lastId = keywordPosts[keywordPosts.length - 1]?.id;
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
    }, [hasMorePosts, loadPostsLoading, keywordPosts, currentCategory]);
    
    return (
        <Fragment>
            <Tabs tabPosition='top' size='default' type='line' onChange={onCategoryChange}>
                {postCategories.map((category, _) => {
                    if(category.enabled) {
                        return (<TabPane key={category.label} tab={`${category.label}`}>
                                    <HomeCardForm posts={keywordPosts} keyword={`${category.label}`}/>
                                </TabPane>)
                    }
                })}
            </Tabs>
        </Fragment>
    );
};

export default Home;