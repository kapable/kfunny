import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import HomeCardSkeleton from './HomeCardSkeleton';
import HomeCards from './HomeCards';
import PropTypes from 'prop-types';

const HomeCardForm = ({ shape, posts, keyword }) => {
    const { mainPosts, loadPostsLoading } = useSelector((state) => state.post);
    if (keyword === "HOT 이슈") {
        return (
            <Fragment>
                {loadPostsLoading ? <HomeCardSkeleton number={10} /> : <HomeCards shape={shape} posts={posts}/>}
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                {loadPostsLoading ? <HomeCardSkeleton number={10} /> : <HomeCards shape={shape} posts={posts}/>}
            </Fragment>
        );   
    }
};

HomeCards.propTypes = {
    shape: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    keyword: PropTypes.string,
};

export default HomeCardForm;