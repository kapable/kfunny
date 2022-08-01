import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import HomeCardSkeleton from './HomeCardSkeleton';
import HomeCards from './HomeCards';

const HomeCardForm = ({ posts, keyword }) => {
    const { mainPosts, loadPostsLoading } = useSelector((state) => state.post);
    if (keyword === "HOT 이슈") {
        return (
            <Fragment>
                {loadPostsLoading ? <HomeCardSkeleton number={10} /> : <HomeCards posts={posts}/>}
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                {loadPostsLoading ? <HomeCardSkeleton number={10} /> : <HomeCards posts={posts}/>}
            </Fragment>
        );   
    }
};

export default HomeCardForm;