import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'antd';
import { ArrowDownOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import * as gtag from '../lib/gtag';
import { useCookies } from 'react-cookie';
import { SET_COUPANG_COOKIE } from '../reducers/post';
import { useRouter } from 'next/router';

const ArticleCardContentsForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [coupangCookies, setCoupangCookie] = useCookies(['coupang']);
    const [isOpened, setIsOpened] = useState(false);
    const { singlePost, coupangCookie } = useSelector((state) => state.post);
    const { managingUrls } = useSelector((state) => state.url);
    
    const adProb = Math.random() < 1.1;
    const otherAdProb = Math.random() < 0.8;
    const coupangLinks = managingUrls.filter((l) => l.name.includes("쿠팡"));
    const isOtherCoupangLink = router.query?.ref_id && coupangLinks.filter((l) => l.name.replace('쿠팡파트너스','') === router.query?.ref_id).length > 0 && otherAdProb;
    const coupangLink = isOtherCoupangLink ? (
        coupangLinks.find((v) => v.name.replace('쿠팡파트너스', '') === router.query?.ref_id)?.link
    ) : (
        coupangLinks.find((v) => v.name === '쿠팡파트너스')?.link
    );
    // const coupangProbIndex = Math.floor(Math.random() * coupangLinks.length);
    // const coupangLink = coupangLinks[coupangProbIndex]?.link;

    const onCoupangButtonClick = useCallback(() => {
        // const cookieAges = 60*60*(24 - new Date().getHours()) <= 60*60*12 ? 60*60*(24 - new Date().getHours()) : 60*60*12;
        const cookieAges = 60*60*12;
        setCoupangCookie('coupang', true, { path: '/', maxAge: cookieAges, secure: true }); // shorter one of 60 sec * 60 min * 12 hour | tommorow 00 - now time
        gtag.event({ action: "Click go-to-Coupang Button", category: "Opening", label: "article page" });
    }, []);

    const onOtherCoupangButtonClick = useCallback(() => {
        // const cookieAges = 60*60*(24 - new Date().getHours()) <= 60*60*12 ? 60*60*(24 - new Date().getHours()) : 60*60*12;
        const cookieAges = 60*60*12;
        setCoupangCookie('coupang', true, { path: '/', maxAge: cookieAges, secure: true }); // shorter one of 60 sec * 60 min * 12 hour | tommorow 00 - now time
        gtag.event({ action: "Click go-to-Other-Coupang Button", category: "Opening", label: "article page" });
    }, []);

    const onCollapseButtonClick = useCallback(() => {
        setIsOpened(true);
        gtag.event({ action: "Click open-article Button", category: "Opening", label: "article page" });
    }, []);

    useEffect(() => {
        dispatch({
            type: SET_COUPANG_COOKIE,
            data: (coupangCookies.coupang == "true")
        });
    }, [coupangCookies.coupang]);

    return (
        <div>
                {/* TEXT CONTENTS */}
                {!singlePost.content || singlePost.conent === null
                ? <br />
                : <p className='article-text'>{singlePost.content}</p>
                }

                {/* IMAGE CONTENTS */}
                {isOpened || coupangCookie // if cover opened, show full images
                ? (
                    singlePost.Images.map((image, index) => (
                        <div className='article-image-div' key={`${singlePost.title}-image${index}-div`}>
                            <Image preview={false} src={image.src} key={`${singlePost.title}-image${index}`} />
                        </div>
                    ))
                )
                : ( // if covered, show the Button
                    <>
                        <div className='article-adCover-image-div' key={`${singlePost.title}-image-div`}>
                            <Image preview={false} src={singlePost.Images[0].src} key={`${singlePost.title}-image`} />
                        </div>
                        <div className='article-adCover-div-1'>
                            <div className='article-adCover-div-2'>
                                {adProb
                                ? 
                                <a href={coupangLink} target="_blank" rel='noreferrer noopener'>
                                    {/* onOtherCoupangButtonClick */}
                                    <Button type="primary" shape='round' style={{ width: '15rem', height: '3rem' }} onClick={isOtherCoupangLink ? onOtherCoupangButtonClick : onCoupangButtonClick}> 
                                        쿠팡 보고 컨텐츠 펼쳐보기<ArrowRightOutlined /><br /><p style={{ fontSize: '0.5rem', color: 'lightgray' }}>원치 않을 경우 뒤로 가기를 눌러주세요</p>
                                    </Button>
                                </a>
                                : 
                                <Button type="primary" shape='round' style={{ width: '15rem'}} onClick={onCollapseButtonClick}>
                                    전체 내용 펼쳐보기<ArrowDownOutlined />
                                </Button>
                                }
                            </div>
                        </div>
                        {adProb
                        ? <p className='article-adCover-coupang-comment'>이 포스팅은 쿠팡 파트너스 활동의 일환으로,<br />이에 따른 일정액의 수수료를 제공받습니다.</p>
                        : null
                        }
                    </>
                )
                }
            </div>
    );
};

ArticleCardContentsForm.propTypes = {
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
    }),
};

export default ArticleCardContentsForm;