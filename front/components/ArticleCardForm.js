import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Image, Divider, List, Comment, Avatar, BackTop, Empty } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import ArticleNewsForm from './ArticleNewsForm';

moment.locale('ko');

const ArticleCardForm = () => {
    let { singlePost } = useSelector((state) => state.post);
    const onShareButtonClick = useCallback(() => {
        alert('링크가 복사되었습니다!');
    }, []);

    return (
        <Fragment>
            <div className='article-info-div'>
                <div className='article-image-title'>{singlePost.title}</div>
                <div className='article-share-btn-div'>
                    <CopyToClipboard
                        text={`https://niair.xyz/post/${singlePost.id}`}
                        onCopy={onShareButtonClick}
                    ><div><LinkOutlined /> 링크 복사하기</div></CopyToClipboard>
                </div>
                <div className='article-date'>{moment(singlePost.createdAt).format('YYYY-MM-DD')}</div>
            </div>
            <Divider dashed />
            {singlePost.Images[0].src
            ? (
                singlePost.Images.map((image, index) => {
                    return (
                        <div className='article-image-div' key={`${singlePost.title}-image${index}-div`}>
                            <Image src={image.src} key={`${singlePost.title}-image${index}`} />
                        </div>
                    )
                })
            )
            : (
                <div className='article-image-div' key={`${singlePost.title}-image${index}-div`}>
                    <Empty description={false} />
                </div>
            )
            }
            <Divider dashed />
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
}

export default ArticleCardForm;