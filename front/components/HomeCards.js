import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card } from 'antd';
import moment from 'moment';

moment.locale('ko');

const HomeCards = ({ posts }) => {
    return (
        posts.map((p) => {
            return (
                <Link href={`/post/${p.id}`} key={`${p.title}_link`}>
                    <a key={`${p.title}_a`}>
                        <Card className='home-card-form' key={`${p.title}_card`}>
                            <div key={`${p.title}_title`}>{p.title}</div>
                            <div className='home-card-form-date' key={`${p.title}_date`}>{moment(p.createdAt).format('YYYY-MM-DD')}</div>
                        </Card>
                    </a>
                </Link>
            );
    })
    );
};

HomeCards.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        User: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        conent: PropTypes.string,
        Category: PropTypes.object.isRequired,
        createdAt: PropTypes.string.isRequired,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    })).isRequired
};

export default HomeCards;