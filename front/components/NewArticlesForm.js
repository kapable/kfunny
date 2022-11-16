import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Link from 'next/link';

moment.locale('ko');

const NewArticlesForm = () => {
    const { mainArticles } = useSelector((state) => state.article);

    return (
        <div className='new-articles-main-div'>
            <h1>최신 기사</h1>
            {mainArticles.map((article) => (
                <Link key={`link-key-${article.title}`} href={`/article/${article.id}`}><a>
                    <Row className='new-articles-each-row' key={`article-row-${article.id}`}>
                        <Col span={18}><h3 className='new-articles-each-title'>{article.title}</h3></Col>
                        <Col span={6}><span className='new-articles-each-date'>{moment(article.createdAt).format('YYYY-MM-DD')}</span></Col>
                    </Row>
                </a></Link>
            ))}
        </div>
    );
};

export default NewArticlesForm;