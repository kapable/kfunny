import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card } from 'antd';
import moment from 'moment';
import * as gtag from '../lib/gtag';

moment.locale('ko');

const HomeCards = ({ shape, posts }) => {
    const onArticleCardClick = useCallback(() => {
        gtag.event({ action: "Click go-to-Article Card", category: "Paging", label: "Home page" });
    }, []);

    return (
        posts.map((post) => (
            <Link prefetch={false} href={`/${shape}/${post.id}`} key={`${post.id}_link`}>
                <a key={`${post.id}_a`}>
                    <Card onClick={onArticleCardClick} className='home-card-form' key={`${post.id}_card`}>
                        <div key={`${post.id}_title`}>{post.title}</div>
                        <div className='home-card-form-date' key={`${post.id}_date`}>{moment(post.createdAt).format('YYYY-MM-DD')}</div>
                    </Card>
                </a>
            </Link>
        ))
    );
};

HomeCards.propTypes = {
    shape: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        User: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        conent: PropTypes.string,
        conents: PropTypes.string,
        Categories: PropTypes.arrayOf(PropTypes.object).isRequired,
        createdAt: PropTypes.string.isRequired,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
        Thumbnails: PropTypes.arrayOf(PropTypes.object),
    })).isRequired
};

export default HomeCards;