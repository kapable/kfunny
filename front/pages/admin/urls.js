import React, { Fragment, useCallback, useEffect } from 'react';
import { Button, Divider, Form, Input, Collapse } from 'antd';
import useInput from '../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_URL_REQUEST, DELETE_URL_REQUEST, LOAD_URLS_REQUEST, SET_URL_REQUEST } from '../../reducers/url';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import axios from 'axios';
import wrapper from '../../store/configureStore';
import { END } from 'redux-saga';
import Router from 'next/router';

const { Panel } = Collapse;

const urls = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);
    const { managingUrls, setUrlDone, addUrlError, deleteUrlDone, addUrlDone } = useSelector((state) => state.url);
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
        if(addUrlDone) {
            alert("새로운 링크가 등록되었습니다!");
        };
    }, [addUrlDone]);

    useEffect(() => {
        if(setUrlDone) {
            alert("새로운 링크 수정이 반영되었습니다!");
            return setLink('');
        };
    }, [setUrlDone]);

    useEffect(() => {
        if(addUrlError) {
            alert(addUrlError);
        }
    }, [addUrlError]);

    useEffect(() => {
        if(deleteUrlDone) {
            alert("링크 삭제가 완료되었습니다!");
        }
    }, [deleteUrlDone]);

    const onSubmit = useCallback(
        () => {
            if(!newName) {
                return alert('링크 별명을 넣어주세요!');
            }
            if(!newLink) {
                return alert('링크 주소를 넣어주세요!');
            }
            if(!newLink.includes("http")) {
                return alert("정확한 링크를 넣어주세요!");
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

    const onLinkDelete = useCallback((id) => () => {
        if (confirm("정말로 삭제하시겠습니까?\n삭제된 링크는 복구가 불가능합니다.") === true) {
            dispatch({
                type: DELETE_URL_REQUEST,
                data: id
            })
        }
    }, []);

    return (
        <Fragment>
            <Collapse accordion>
                <Panel header="새로운 Url 등록" key="new-url-set">
                    <Form onFinish={onSubmit} layout="vertical" className='user-profile-edit-form'>
                        <h3>새로운 Url 등록</h3>
                        <div>
                            <Form.Item htmlFor="user-nick" required label="링크 별명">
                                <Input name="user-nick" value={newName} placeholder="쿠팡파트너스2(기존 별명과 중복 불가)" required onChange={onChangeNewName}/>
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item htmlFor="user-nick" required label="링크 주소">
                                <Input name="user-nick" value={newLink} placeholder="https://kfunny.com" required onChange={onChangeNewLink}/>
                            </Form.Item>
                        </div>
                        <div className='admin-url-form-button-group'>
                            <Button type="primary" htmlType="submit" >링크 등록</Button>
                        </div>
                        <br />
                    </Form>
                </Panel>
                {/* <h3 className='admin-urls-default-title'>기존 등록된 Url</h3> */}
                {managingUrls.map((v) => {
                    return (
                        <Panel header={v.name} key={`${v.link}_fragment`}>
                            <Form key={`${v.link}_form_item`} onFinish={onLinkSubmit} layout="vertical" className='user-profile-edit-form'>
                                <h3 key={`${v.link}_name`}>{v.name}</h3>
                                기존 링크<br /><a href={v.link} target="_blank" rel='noreferrer noopener' key={`${v.link}_link`}>{v.link}</a>
                                <div className='admin-urls-delete-btn-div'>
                                    <Button onClick={onLinkDelete(v.id)} className='admin-urls-delete-btn' type="primary" danger >링크 삭제</Button>
                                </div>
                                <div key={`${v.link}_edit_form`}>
                                    <Form.Item key={`${v.link}_form_item`} htmlFor="user-nick" required label="새로운 링크 주소">
                                        <Input key={`${v.link}_input`} name="user-nick" value={link} required onChange={onChangeLink}/>
                                    </Form.Item>
                                </div>
                                <div key={`${v.link}_submit_btn`} className='admin-url-form-button-group'>
                                    <Button type="primary" htmlType="submit" >링크 수정</Button>
                                </div>
                                <br />
                            </Form>
                            {/* <Divider key={`${v.link}_divider`} dashed /> */}
                        </Panel>
                    )
                })}
            </Collapse>
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