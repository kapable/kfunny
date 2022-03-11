import React, { Fragment, useCallback, useEffect } from 'react';
import { Button, Divider, Form, Input } from 'antd';
import useInput from '../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_URL_REQUEST, LOAD_URLS_REQUEST, SET_URL_REQUEST } from '../../reducers/url';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import axios from 'axios';
import wrapper from '../../store/configureStore';
import { END } from 'redux-saga';
import Router from 'next/router';

const urls = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);
    const { managingUrls, setUrlDone } = useSelector((state) => state.url);
    const [newName, onChangeNewName] = useInput('');
    const [newLink, onChangeNewLink] = useInput('');
    const [name, onChangeName] = useInput(managingUrls[0]?.name || null);
    const [link, onChangeLink, setLink] = useInput('');

    useEffect(() => {
        if(!userInfo?.admin) {
            alert('관리자 로그인이 필요합니다!');
            Router.replace('/login');
        }
    }, [userInfo]);

    useEffect(() => {
        if(setUrlDone) {
            alert("새로운 링크 수정이 반영되었습니다!");
            return setLink('');
        };
    }, [setUrlDone]);

    const onSubmit = useCallback(
        () => {
            if(!newName) {
                return alert('링크 별명을 넣어주세요!');
            }
            if(!newLink) {
                return alert('링크 주소를 넣어주세요!');
            }
            dispatch({
                type: ADD_URL_REQUEST,
                data: { name: newName, link: newLink }
            })
        },
        [newName, newLink],
    )

    const onLinkSubmit = useCallback(() => {
        if(!link) {
            return alert('새로운 링크 주소를 넣어주세요!');
        };
        dispatch({
            type: SET_URL_REQUEST,
            data: { name, link },
        });
        
    }, [name, link]);

    return (
        <Fragment>
            <h3>기존 등록된 Url</h3>
            {managingUrls.map((v) => {
                return (
                    <Form key={`${v.link}_form_item`} onFinish={onLinkSubmit} layout="vertical" className='user-profile-edit-form'>
                        <h3 key={`${v.link}_name`}>{v.name}</h3>
                        기존 링크<br /><a href={v.link} target="_blank" rel='noreferrer noopener' key={`${v.link}_link`}>{v.link}</a>
                        <div key={`${v.link}_edit_form`}>
                            <Form.Item key={`${v.link}_form_item`} htmlFor="user-nick" required label="새로운 링크 주소">
                                <Input key={`${v.link}_input`} name="user-nick" value={link} required onChange={onChangeLink}/>
                            </Form.Item>
                        </div>
                        <div key={`${v.link}_submit_btn`} className='signup-form-button-group'>
                            <Button type="primary" htmlType="submit" >링크 수정</Button>
                        </div>
                    </Form>
                )
            })}
            <Divider dashed />
            <Form onFinish={onSubmit} layout="vertical" className='user-profile-edit-form'>
                <h3>새로운 Url 등록(아직 다루지 마세요)</h3>
                <div>
                    <Form.Item htmlFor="user-nick" required label="링크 별명">
                        <Input name="user-nick" value={newName} placeholder="쿠팡파트너스" required onChange={onChangeNewName}/>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item htmlFor="user-nick" required label="링크 주소">
                        <Input name="user-nick" value={newLink} placeholder="https://kfunny.com" required onChange={onChangeNewLink}/>
                    </Form.Item>
                </div>
                <div className='signup-form-button-group'>
                    <Button type="primary" htmlType="submit" >링크 등록</Button>
                </div>
            </Form>
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
        type: LOAD_URLS_REQUEST
    });
    context.store.dispatch(END)

    await context.store.sagaTask.toPromise()
});

export default urls;