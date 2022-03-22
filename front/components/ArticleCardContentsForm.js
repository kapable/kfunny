import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Image } from 'antd';
import { ArrowDownOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import * as gtag from '../lib/gtag';

const ArticleCardContentsForm = () => {
    const [isOpened, setIsOpened] = useState(false);
    const { singlePost } = useSelector((state) => state.post);
    const { managingUrls } = useSelector((state) => state.url);

    useEffect(() => {
        window.location.href.includes('fbclid') && window.history?.length > 1 ? setIsOpened(true) : null;
    });
    
    const adProb = Math.random() < 0.5;
    const coupangLinks = managingUrls.filter((l) => l.name.includes("쿠팡"))
    const coupangProbIndex = Math.floor(Math.random() * coupangLinks.length);
    const coupangLink = coupangLinks[coupangProbIndex]?.link;

    const onCoupangButtonClick = useCallback(() => {
        setIsOpened(true);
        gtag.event({ action: "Click go-to-Coupang Button", category: "Opening", label: "article page" });
    }, []);

    const onCollapseButtonClick = useCallback(() => {
        setIsOpened(true);
        gtag.event({ action: "Click open-article Button", category: "Opening", label: "article page" });
    }, []);

    return (
        <div>
                {/* TEXT CONTENTS */}
                {singlePost.content
                ? <p className='article-text'>{singlePost.content}</p>
                : <br />
                }

                {/* IMAGE CONTENTS */}
                {isOpened // if cover opened, show full images
                ? (
                    singlePost.Images.map((image, index) => {
                        return (
                            <div className='article-image-div' key={`${singlePost.title}-image${index}-div`}>
                                <Image preview={false} src={image.src} key={`${singlePost.title}-image${index}`} />
                            </div>
                        )
                    })
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
                                    <Button type="primary" shape='round' style={{ width: '15rem'}} onClick={onCoupangButtonClick}>
                                        쿠팡 보고 컨텐츠 펼쳐보기<ArrowRightOutlined />
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