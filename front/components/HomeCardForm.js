import React, { Fragment } from 'react';
import { Card } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Link from 'next/link';

moment.locale('ko');

const HomeCardForm = ({ posts, keyword }) => {
    const { mainPosts } = useSelector((state) => state.post);

    return (
        <Fragment>
            {/* {mainPosts.filter((post) => post.Category.label === keyword).map((p) => {
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
            })} */}
            {posts.map((p) => {
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
            })}
        </Fragment>
    );
};

export default HomeCardForm;