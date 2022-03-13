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

moment.locale('ko');

const ArticleCardForm = () => {
    const [isOpened, setIsOpened] = useState(false);
    const adProb = Math.random() < 0.7;
    let { singlePost } = useSelector((state) => state.post);
    const { managingUrls } = useSelector((state) => state.url);
    const coupangLink = managingUrls.find((l) => l.name === '쿠팡파트너스')?.link
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

    useEffect(() => {
        let ins1 = document.createElement('ins');
        let scr1 = document.createElement('script');

        ins1.className = 'kakao_ad_area';
        ins1.style = "display:none; width:100%;";
        scr1.async = 'true';
        scr1.type = "text/javascript";
        scr1.src = "//t1.daumcdn.net/kas/static/ba.min.js";
        ins1.setAttribute('data-ad-width', '320');
        ins1.setAttribute('data-ad-height', '100');
        ins1.setAttribute('data-ad-unit', 'DAN-wN8zCE2QtbLUdIdN');

        document.querySelector('.adfit1').appendChild(ins1);
        document.querySelector('.adfit1').appendChild(scr1);

        let ins2 = document.createElement('ins');
        let scr2 = document.createElement('script');

        ins2.className = 'kakao_ad_area';
        ins2.style = "display:none; width:100%;";
        scr2.async = 'true';
        scr2.type = "text/javascript";
        scr2.src = "//t1.daumcdn.net/kas/static/ba.min.js";
        ins2.setAttribute('data-ad-width', '320');
        ins2.setAttribute('data-ad-height', '250');
        ins2.setAttribute('data-ad-unit', 'DAN-DYCEsAfKbdOgVEC9');

        document.querySelector('.adfit1').appendChild(ins2);
        document.querySelector('.adfit1').appendChild(scr2);
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
            <div className="adfit1" />
            <Divider dashed />
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
            <div className="adfit2" />
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