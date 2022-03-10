import React, { Fragment, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Space, Image } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { LOAD_POSTS_REQUEST, REMOVE_POST_REQUEST } from '../../reducers/post';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Router from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import moment from 'moment';
import Head from 'next/head';
import { backUrl } from '../../config/config';

moment.locale('ko');
const { Column, ColumnGroup } = Table;

const PostList = () => {
    const dispatch = useDispatch();
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        console.log(mainPosts[0]);
        if(!userInfo?.admin) {
            alert('관리자 로그인이 필요합니다!');
            Router.replace('/login');
        }
    }, [userInfo]);

    useEffect(() => {
        function onScroll() {
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500) {
                if(hasMorePosts && !loadPostsLoading) {
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        data: encodeURI('HOT 이슈'),
                        lastId
                    });
                };
            };
        };
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMorePosts, loadPostsLoading, mainPosts]);

    const onShareButtonClick = useCallback(() => {
        alert('링크가 복사되었습니다!');
    }, []);
    
    const onRemovePost = useCallback((id) => {
        if (confirm("정말로 삭제하시겠습니까?\n삭제된 게시물은 복구가 불가능합니다.") === true) {
            dispatch({
                type: REMOVE_POST_REQUEST,
                data: id,
            });
        }
    }, []);
    return (
        <Fragment>
            <Head>
                <title>게시물 리스트 | 케이퍼니</title>
                <meta charSet='utf-8'/>
                <link rel='main-url' href='https://niair.xyz/admin/posts' />
                <link rel='shortcut icon' href='/favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta name="keywords" content="핫이슈, 뉴스, 최신 트렌드, 정보, 웃긴, 돈되는, 케이퍼니, 케이퍼티" />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content='https://niair.xyz/admin/posts' />
                <meta property="og:title" content="게시물 리스트 | 케이퍼니"/>
                <meta property="og:description" content="핫이슈가 모인 최신 미디어, 케이퍼니"/>
                <meta property="og:image" content="https://ktestone.com/static/media/main-header.21ffb6bb.png"/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:alt" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta property='og:site_name' content="게시물 리스트 | 케이퍼니" />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content='https://niair.xyz/admin/posts'/>
                <meta property="twitter:title" content="게시물 리스트 | 케이퍼니"/>
                <meta property="twitter:description" content="핫이슈가 모인 최신 미디어, 케이퍼니"/>
                <meta property="twitter:image" content="https://ktestone.com/static/media/main-header.21ffb6bb.png"/>
                <meta property="twitter:image:width" content="800"/>
                <meta property="twitter:image:height" content="400"/>
                <meta property="twitter:image:alt" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta property='og:site_name' content="게시물 리스트 | 케이퍼니" />
            </Head>
            <Table pagination={{ hideOnSinglePage: true }} dataSource={mainPosts} key="table" rowKey={post => post.id}>
                <Column title="No." dataIndex="id" key="post-id" />
                <Column title="제목" dataIndex="title" key="title" />
                <Column
                    title="링크" key="link-copy"
                    render={(_, post) => (
                        <CopyToClipboard
                            text={`https://niair.xyz/post/${post.id}`}
                            onCopy={onShareButtonClick}
                        ><div><LinkOutlined /></div></CopyToClipboard>
                    )}
                />
                <Column title="미리보기" key="preview" render={(_, post) => (
                    <Image width={70} src={post.Thumbnails.length ? post.Thumbnails[0]?.src : post.Images[0]?.src} alt={post.title} />
                )}/>
                <ColumnGroup title="수정/삭제">
                    <Column
                        title="" key="edit"
                        render={() => (
                            <Space size="middle">
                                <a>수정</a>
                            </Space>
                        )}
                    />
                    <Column
                        title="" key="delete"
                        dataIndex="id"
                        render={(id) => (
                            <Space size="middle">
                                <a onClick={() => onRemovePost(id)}>삭제</a>
                            </Space>
                        )}
                    />
                </ColumnGroup>
                <Column
                    title="작성일"
                    dataIndex="createdAt"
                    key="createdAt"
                    render={(date) => (
                        <Space size="middle">
                            {moment(date).format('YYYY-MM-DD')}
                        </Space>
                    )}
                    />
            </Table>
        </Fragment>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST
    });
    context.store.dispatch({
        type: LOAD_POSTS_REQUEST,
        data: encodeURI("HOT 이슈"),
    });
    context.store.dispatch(END)

    await context.store.sagaTask.toPromise()
});

export default PostList;