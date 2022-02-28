import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import HomeCardForm from '../components/HomeCardForm';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

const { TabPane } = Tabs;

const Home = () => {
    const dispatch = useDispatch();
    const { postCategories, keywordPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
    const [currentCategory, setCurrentCategory] = useState(postCategories[0].value);
    const onCategoryChange = useCallback((category) => {
        setCurrentCategory(category);
    }, []);
    useEffect(() => {
        dispatch({
            type: LOAD_POSTS_REQUEST,
            data: currentCategory,
        })
    }, [currentCategory])

    useEffect(() => {
        function onScroll() {
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500) {
                if(hasMorePosts && !loadPostsLoading) {
                    const lastId = keywordPosts[keywordPosts.length - 1]?.id;
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        data: currentCategory,
                        lastId
                    })
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [hasMorePosts, loadPostsLoading, keywordPosts, currentCategory])
    
    return (
        <Fragment>
            <Tabs tabPosition='top' size='default' type='line' onChange={onCategoryChange}>
                {postCategories.map((category, _) => {
                    return (<TabPane key={category.value} tab={`${category.label}`}>
                                <HomeCardForm posts={keywordPosts} keyword={`${category.label}`}/>
                            </TabPane>)
                })}
            </Tabs>
        </Fragment>
    );
};

export default Home;