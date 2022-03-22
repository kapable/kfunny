import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Divider, List, Comment, Avatar, BackTop } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import ArticleNewsForm from './ArticleNewsForm';
import ArticleCardContentsForm from './ArticleCardContentsForm';
import * as gtag from '../lib/gtag';
import AdPlus from '../lib/AdPlus';
import Mobon from '../lib/Mobon';

moment.locale('ko');

const ArticleCardForm = () => {
    const { userInfo } = useSelector((state) => state.user);
    let { singlePost } = useSelector((state) => state.post);
    
    const onShareButtonClick = useCallback(() => {
        gtag.event({ action: "Click link-share Button", category: "Sharing", label: "article page"});
        alert('링크가 복사되었습니다!');
    }, []);

    return (
        <Fragment>
            {/* ARTICLE HEADER */}
            <div className='article-info-div'>
                <div className='article-image-title'>{singlePost.title}</div>
                <div className='article-share-btn-div'>
                    <CopyToClipboard
                        text={userInfo?.admin ? `https://niair.xyz/post/${singlePost.id}?ref_id=${userInfo.id}` : `https://niair.xyz/post/${singlePost.id}`} // in case of 1.for Admin refferer tracking 2. ordinary user
                        onCopy={onShareButtonClick}
                    ><div><LinkOutlined /> 링크 복사하기</div></CopyToClipboard>
                </div>
                <div className='article-date'>{moment(singlePost.createdAt).format('YYYY-MM-DD')}</div>
            </div>

            {/* ADPLUS VIDEO ADS */}
            <AdPlus />

            {/* MOBION ADS */}
            <Mobon />
            <Divider dashed />

            {/* ARTICLE CONTENTS */}
            <ArticleCardContentsForm />
            <Divider dashed />

            {/* COMMENT FORM */}
            <CommentForm singlePost={singlePost} />
            <div className='article-comment-list-div'>
                <List
                    className='article-comment-list'
                    header={`${singlePost.Comments.length}개의 댓글`}
                    dataSource={singlePost.Comments}
                    itemLayout="horizontal"
                    renderItem={(item) => (
                        <li>
                            <Comment
                                author={item.User.nickname}
                                avatar={(
                                    <Avatar>{item.User.nickname[0]}</Avatar>
                                )}
                                content={item.content}
                                datetime={moment(item.createdAt).format('YYYY-MM-DD')}
                            />
                        </li>
                    )}
                />
            </div>
            <Divider dashed />

            {/* NEW ARTICLES LIST */}
            <ArticleNewsForm />
            <BackTop />
        </Fragment>
    );
};

ArticleCardForm.propTypes = {
    singlePost: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        title: PropTypes.string,
        conent: PropTypes.string,
        Category: PropTypes.object,
        createdAt: PropTypes.string,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
        Thumbnails: PropTypes.arrayOf(PropTypes.object),
    })
};

export default ArticleCardForm;