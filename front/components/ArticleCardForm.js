import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Image, Divider } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';

moment.locale('ko');

const ArticleCardForm = ({ singlePost }) => {
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
            {singlePost.Images.map((image) => {
                return (
                    <div className='article-image-div'>
                        <Image src={image.src} />
                    </div>
                )
            })}
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
    })
}

export default ArticleCardForm;