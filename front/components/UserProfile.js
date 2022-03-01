import React, { Fragment, useCallback, useState, useEffect } from 'react';
import { Avatar, Button, Card, Form, Input } from 'antd'
import { EditOutlined } from '@ant-design/icons';
import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST, LOG_OUT_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import moment from 'moment';

moment.locale('ko');

const UserProfile = () => {
    // for LogIn and LogOut check
    const dispatch = useDispatch();
    const { logInDone, logInError, userInfo, logOutLoading, changeNicknameDone, changeNicknameLoading } = useSelector((state) => state.user);
    useEffect(() => {
        if(!(userInfo && logInDone)) {
            Router.replace('/');
        }
    }, [userInfo && logInDone]);

    useEffect(() => {
        if(changeNicknameDone) {
            alert("닉네임 수정이 반영되었습니다!");
        }
    }, [changeNicknameDone]);

    useEffect(() => {
        if (logInError) {
            alert(logInError);
        };
    }, [logInError]);

    const [nickname, setNickname] = useInput(userInfo?.nickname || '');
    const [description, setDescription] = useInput(userInfo?.description || '');
    const [infoEditMode, setInfoEditMode] = useState(false);

    const onLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }, [LOG_OUT_REQUEST]);

    const onInfoEditMode = useCallback(() => {
        setInfoEditMode(!infoEditMode);
    }, [infoEditMode]);

    const onNicknameSubmit = useCallback(() => {
        if (!nickname) {
            alert('닉네임을 적어주세요!');
        } else if (nickname.length > 20) {
            alert('닉네임은 20자 이내로 적어주세요!');
        } else {
            dispatch({
                type: CHANGE_NICKNAME_REQUEST,
                data: nickname,
            });
            setInfoEditMode(false);
        };
    }, [nickname]);

    const onDescriptionSubmit = useCallback(() => {
        if(description.length > 50) {
            alert('소개는 50자 이내로 적어주세요!');
        };
        setInfoEditMode(false);
    }, [description]);

    return (
        <Fragment>
            <Card
                className='user-profile-card'
                actions={[
                    <div key="register-date">가입일자<br />{moment(userInfo?.createdAt).format('YYYY-MM-DD') || ''}</div>,
                    <div key="comment">내가 쓴 댓글<br />0</div>,
                    <div key="edit" onClick={onInfoEditMode}>수정하기<br /><EditOutlined className="user-profile-card-edit"  /></div>
                    
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>{nickname[0]}</Avatar>}
                    title={nickname}
                    description={description}
                />
                <Button onClick={onLogout} className='user-profile-logout-btn' loading={logOutLoading}>로그아웃</Button>
            </Card>
            {infoEditMode
            ? (
                <Form className='user-profile-edit-form'>
                    <Input.Search 
                        className='user-profile-edit-input'
                        value={nickname}
                        onChange={setNickname}
                        addonBefore="닉네임"
                        enterButton="수정"
                        onSearch={onNicknameSubmit}
                        loading={changeNicknameLoading}
                    />
                    <Input.Search
                        className='user-profile-edit-input'
                        value={description}
                        onChange={setDescription}
                        addonBefore="소개"
                        enterButton="수정"
                        onSearch={onDescriptionSubmit}
                    />
                </Form>
            )
            : (
                null
            )}
        </Fragment>
    );
};

export default UserProfile;