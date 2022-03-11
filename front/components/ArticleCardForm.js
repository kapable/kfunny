import React, { Fragment, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Divider, List, Comment, Avatar, BackTop, Empty } from 'antd';
import { ArrowDownOutlined, LinkOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import ArticleNewsForm from './ArticleNewsForm';

moment.locale('ko');

const ArticleCardForm = () => {
    const [isOpened, setIsOpened] = useState(false);
    const adProb = Math.random() < 0.5;
    let { singlePost } = useSelector((state) => state.post);
    const { managingUrls } = useSelector((state) => state.url);
    const coupangLink = managingUrls.find((l) => l.name === '쿠팡파트너스')?.link;
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
                        <div style={{ position: 'relative', height: '13rem', overflowY: 'hidden'}} className='article-image-div' key={`${singlePost.title}-image-div`}>
                            <Image preview={false} src={singlePost.Images[0].src} key={`${singlePost.title}-image`} />
                        </div>
                        <div style={{position: 'relative',backgroundColor: 'rgba(255,255,255,0.7)', height: '3rem', top: '-3rem'}}>
                            <div style={{position: 'relative', height: '13rem' , width: '15rem', height: '3rem', margin: '0 auto', top: '0rem'}}>
                                {adProb
                                ? <a href={coupangLink} target="_blank" rel='noreferrer noopener'><Button type="primary" shape='round' style={{ width: '15rem'}} onClick={setIsOpened}>쿠팡 보고 펼쳐보기</Button></a>
                                : <Button type="primary" shape='round' style={{ width: '15rem'}} onClick={setIsOpened}>전체 내용 펼쳐보기<ArrowDownOutlined /></Button>}
                            </div>
                        </div>
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