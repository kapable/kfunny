import { Card } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as gtag from '../lib/gtag';

const { Meta } = Card;

const ArticleNewsForm = () => {
    const { mainPosts } = useSelector((state) => state.post);
    const onArticleListClick = useCallback(() => {
        gtag.event({ action: "Click go-to-another-Article Card", category: "Paging", label: "article page news list" });
    }, []);
    return (
        <div className='article-news-form-div'>
            <h3 className='article-news-form-title'>최신 기사</h3>
            {mainPosts.map((post) => (
                <Link prefetch={false} href={`/post/${post.id}`} key={`${post.id}_link`}><a key={`${post.title}_a`}>
                    <Card
                        key={`${post.title}_title`}
                        className='article-news-form-card'
                        hoverable
                        onClick={onArticleListClick}
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