import { Card } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

const { Meta } = Card;

const ArticleNewsForm = () => {
    const { mainPosts } = useSelector((state) => state.post);
    return (
        <div className='article-news-form-div'>
            <h3 className='article-news-form-title'>최신 기사</h3>
            {mainPosts.map((post) => (
                <Link href={`/post/${post.id}`} key={`${post.id}_link`}><a key={`${post.title}_a`}>
                    <Card
                        key={`${post.title}_title`}
                        className='article-news-form-card'
                        hoverable
                        cover={<div className='article-news-form-cover-div' key={`${post.title}_cover_div`}>
                                <img
                                    key={`${post.title}_cover`}
                                    className='article-news-form-cover-img'
                                    src={post.Thumbnails.length ? post.Thumbnails[0]?.src :post.Images[0]?.src}
                                    alt={post.title}/>
                                </div>}
                    >
                        <Meta title={post.title} description={moment(post.createdAt).format('YYYY-MM-DD')}/>
                    </Card>
                </a></Link>
            ))}
        </div>
    );
};

export default ArticleNewsForm;