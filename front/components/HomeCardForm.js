import React, { Fragment } from 'react';
import { Card } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Link from 'next/link';

moment.locale('ko');

const HomeCardForm = ({ keyword }) => {
    const { mainPosts } = useSelector((state) => state.post);

    return (
        <Fragment>
            {mainPosts.filter((post) => post.Category.label === keyword).map((p) => {
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
            {new Array(10).fill(null).map((_, index) => {
                const key = index + 1;
                return (
                    <Card className='home-card-form' key={key+keyword} title={`#title_${keyword}`}>
                        <p>{`#contents_${keyword}`}</p>
                    </Card>
                );
            })}
        </Fragment>
    );
};

export default HomeCardForm;