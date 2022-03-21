import React, { Fragment, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Divider, List, Comment, Avatar, BackTop, Empty } from 'antd';
import { ArrowDownOutlined, ArrowRightOutlined, LinkOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import ArticleNewsForm from './ArticleNewsForm';
import * as gtag from '../lib/gtag';
import AdPlus from '../lib/AdPlus';
import Mobon from '../lib/Mobon';

moment.locale('ko');

const ArticleCardForm = () => {
    const [isOpened, setIsOpened] = useState(false);
    const adProb = Math.random() < 0.5;
    const { userInfo } = useSelector((state) => state.user);
    let { singlePost } = useSelector((state) => state.post);
    const { managingUrls } = useSelector((state) => state.url);

    const coupangLinks = managingUrls.filter((l) => l.name.includes("쿠팡"))
    const coupangProbIndex = Math.floor(Math.random() * coupangLinks.length);
    const coupangLink = coupangLinks[coupangProbIndex].link;

    useEffect(() => {
        window.location.href.includes('fbclid') && window.history?.length > 1 ? setIsOpened(true) : null;
    });
    const onShareButtonClick = useCallback(() => {
        gtag.event({ action: "Click link-share Button", category: "Sharing", label: "article page"});
        alert('링크가 복사되었습니다!');
    }, []);

    const onCoupangButtonClick = useCallback(() => {
        setIsOpened(true);
        gtag.event({ action: "Click go-to-Coupang Button", category: "Opening", label: "article page" });
    }, []);

    const onCollapseButtonClick = useCallback(() => {
        setIsOpened(true);
        gtag.event({ action: "Click open-article Button", category: "Opening", label: "article page" });
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
            <div>
                {isOpened
                ? (
                    singlePost.Images.map((image, index) => {
                        return (
                            <div className='article-image-div' key={`${singlePost.title}-image${index}-div`}>
                                <Image preview={false} src={image.src} key={`${singlePost.title}-image${index}`} />
                            </div>
                        )
                    })
                )
                : (
                    <>
                        <div className='article-adCover-image-div' key={`${singlePost.title}-image-div`}>
                            <Image preview={false} src={singlePost.Images[0].src} key={`${singlePost.title}-image`} />
                        </div>
                        <div className='article-adCover-div-1'>
                            <div className='article-adCover-div-2'>
                                {adProb
                                ? 
                                <a href={coupangLink} target="_blank" rel='noreferrer noopener'>
                                    <Button type="primary" shape='round' style={{ width: '15rem'}} onClick={onCoupangButtonClick}>쿠팡 보고 컨텐츠 펼쳐보기<ArrowRightOutlined /></Button>
                                </a>
                                : <Button type="primary" shape='round' style={{ width: '15rem'}} onClick={onCollapseButtonClick}>전체 내용 펼쳐보기<ArrowDownOutlined /></Button>}
                            </div>
                        </div>
                        {adProb
                        ? <p className='article-adCover-coupang-comment'>이 포스팅은 쿠팡 파트너스 활동의 일환으로,<br />이에 따른 일정액의 수수료를 제공받습니다.</p>
                        : null
                        }
                    </>
                )
                }
                {/* <div className='article-image-div' key={`${singlePost.title}-image${index}-div`}>
                    <Empty description={false} />
                </div> */}
            </div>
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
}

export default ArticleCardForm;