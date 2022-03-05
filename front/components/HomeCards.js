import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card } from 'antd';
import moment from 'moment';

moment.locale('ko');

const HomeCards = ({ posts }) => {
    return (
        posts.map((post) => (
            <Link href={`/post/${post.id}`} key={`${post.id}_link`}>
                <a key={`${post.id}_a`}>
                    <Card className='home-card-form' key={`${post.id}_card`}>
                        <div key={`${post.id}_title`}>{post.title}</div>
                        <div className='home-card-form-date' key={`${post.id}_date`}>{moment(post.createdAt).format('YYYY-MM-DD')}</div>
                    </Card>
                </a>
            </Link>
        ))
    );
};

HomeCards.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        User: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        conent: PropTypes.string,
        Categories: PropTypes.arrayOf(PropTypes.object).isRequired,
        createdAt: PropTypes.string.isRequired,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    })).isRequired
};

export default HomeCards;