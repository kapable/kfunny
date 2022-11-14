import { LinkOutlined } from '@ant-design/icons';
import React, { Fragment, useCallback } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import CopyToClipboard from 'react-copy-to-clipboard';
import * as gtag from '../lib/gtag';
import { BackTop, Divider } from 'antd';
import NewArticlesForm from './NewArticlesForm';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { REMOVE_ARTICLE_REQUEST } from '../reducers/article';
import { useRouter } from 'next/router';

moment.locale('ko');

const ContentsCardForm = () => {
    const router = useRouter();
    const { singleArticle } = useSelector((state) => state.article);
    const { userInfo } = useSelector((state) => state.user);

    const onShareButtonClick = useCallback(() => {
        gtag.event({ action: "Click link-share Button", category: "Sharing", label: "article page"});
        alert('링크가 복사되었습니다!');
    }, []);

    const onEditClick = useCallback(() => {
        router.push(`/admin/uploadArticle/edit/${singleArticle.id}`);
    }, [singleArticle]);

    const onDeleteClick = useCallback(() => {
        if (confirm("정말로 삭제하시겠습니까?\n삭제된 기사는 복구가 불가능합니다.") === true) {
            dispatch({
                type: REMOVE_ARTICLE_REQUEST,
                data: { articleId: singleArticle.id },
            });
        };
        router.push('/');
    }, [singleArticle]);
    
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
                    {userInfo?.admin
                    ? (<>
                            <div onClick={onEditClick}><EditOutlined /> 수정하기</div>
                            <div onClick={onDeleteClick}><DeleteOutlined /> 삭제하기</div>
                        </>
                    )
                    : null}
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