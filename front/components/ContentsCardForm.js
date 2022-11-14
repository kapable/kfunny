import { LinkOutlined } from '@ant-design/icons';
import React, { Fragment, useCallback } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import CopyToClipboard from 'react-copy-to-clipboard';
import * as gtag from '../lib/gtag';
import { BackTop, Divider } from 'antd';
import NewArticlesForm from './NewArticlesForm';

moment.locale('ko');

const ContentsCardForm = () => {
    const { singleArticle } = useSelector((state) => state.article);
    const { userInfo } = useSelector((state) => state.user);

    const onShareButtonClick = useCallback(() => {
        gtag.event({ action: "Click link-share Button", category: "Sharing", label: "article page"});
        alert('링크가 복사되었습니다!');
    }, []);
    
    return (
        <Fragment>
            {/* ARTICLE HEADER */}
            <div className='article-info-div'>
                <div className='article-image-title'>{singleArticle.title}</div>
                <div className='article-share-btn-div'>
                    <CopyToClipboard
                        text={userInfo?.admin ? `https://niair.xyz/article/${singleArticle.id}?ref_id=${userInfo.id}` : `https://niair.xyz/article/${singleArticle.id}`} // in case of 1.for Admin refferer tracking 2. ordinary user
                        onCopy={onShareButtonClick}
                    ><div><LinkOutlined /> 링크 복사하기</div></CopyToClipboard>
                </div>
                <div className='article-date'>{moment(singleArticle.createdAt).format('YYYY-MM-DD')}</div>
            </div>

            {/* COMMENT FORM */}
            <div className='article-contents-main-div'>
                <div className='article-contents-div' dangerouslySetInnerHTML={{ __html: singleArticle.contents }}></div>
            </div>

            <Divider dashed />

            {/* NEW ARTICLES LIST */}
            <NewArticlesForm />
            <BackTop />
        </Fragment>
    );
};

export default ContentsCardForm;