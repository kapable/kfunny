import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import React, { Fragment, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import { Button, Divider, Form, Input } from 'antd';
import { LOAD_MY_INFO_REQUEST } from '../../../reducers/user';
import { LOAD_POST_REQUEST, SET_POST_TITLE_REQUEST } from '../../../reducers/post';
import wrapper from '../../../store/configureStore';
import useInput from '../../../hooks/useInput';

const editPost = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query;
    const { singlePost, setPostTitleDone } = useSelector((state) => state.post);
    const { userInfo } = useSelector((state) => state.user);
    const [title, onChangeTitle, setTitle] = useInput('');

    useEffect(() => {
        if(!userInfo?.admin) {
            alert('관리자 로그인이 필요합니다!');
            Router.replace('/login');
        }
    }, [userInfo]);

    useEffect(() => {
        if(setPostTitleDone) {
            alert("제목 수정이 반영되엇습니다!");
            return setTitle('');
        }
    }, [setPostTitleDone]);

    const onTitleSubmit = useCallback(() => {
        if(!title) {
            return alert("제목란을 채워주세요!");
        };
        dispatch({
            type: SET_POST_TITLE_REQUEST,
            data: { id, title }
        });
    }, [id, title]);

    return (
        <Fragment>
            <Head>
                <title>게시물 수정 | 케이퍼니</title>
                <meta charSet='utf-8'/>
                <link rel='main-url' href={`https://niair.xyz/admin/editPost/${id}`} />
                <link rel='shortcut icon' href='/favicon.png'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta name="keywords" content="핫이슈, 뉴스, 최신 트렌드, 정보, 웃긴, 돈되는, 케이퍼니, 케이퍼티" />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={`https://niair.xyz/admin/editPost/${id}`} />
                <meta property="og:title" content="게시물 수정 | 케이퍼니"/>
                <meta property="og:description" content="핫이슈가 모인 최신 미디어, 케이퍼니"/>
                <meta property="og:image" content="https://ktestone.com/static/media/main-header.21ffb6bb.png"/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:alt" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta property='og:site_name' content="게시물 수정 | 케이퍼니" />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content={`https://niair.xyz/admin/editPost/${id}`}/>
                <meta property="twitter:title" content="게시물 수정 | 케이퍼니"/>
                <meta property="twitter:description" content="핫이슈가 모인 최신 미디어, 케이퍼니"/>
                <meta property="twitter:image" content="https://ktestone.com/static/media/main-header.21ffb6bb.png"/>
                <meta property="twitter:image:width" content="800"/>
                <meta property="twitter:image:height" content="400"/>
                <meta property="twitter:image:alt" content="핫이슈가 모인 최신 미디어, 케이퍼니" />
                <meta property='og:site_name' content="게시물 수정 | 케이퍼니" />
            </Head>
            {/* TITLE EDITING */}
            <Form onFinish={onTitleSubmit} layout="vertical" className='user-profile-edit-form'>
                <p>*현재 제목 편집만 가능합니다.<br />(추후 콘텐츠 편집 기능 추가 예정)</p>
                <h3>기존 제목</h3>
                <h1 className='admin-upload-title-preview'>{singlePost.title}</h1>
                <div>
                    <Form.Item htmlFor='post-title' required label="새로운 제목">
                        <Input name='post-title' value={title} required onChange={onChangeTitle} maxLength={30}/>
                    </Form.Item>
                </div>
                <div className='signup-form-button-group'>
                    <Button type="primary" htmlType="submit" >제목 수정</Button>
                </div>
            </Form>
            <Divider dashed />
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
        type: LOAD_POST_REQUEST,
        data: context.params.id,
    });
    context.store.dispatch(END)

    await context.store.sagaTask.toPromise()
});

export default editPost;