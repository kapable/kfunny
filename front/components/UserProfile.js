import React, { Fragment, useCallback, useState, useEffect } from 'react';
import { Avatar, Button, Card, Form, Input } from 'antd'
import { EditOutlined } from '@ant-design/icons';
import useInput from '../hooks/useInput';
import { logoutAction } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

const UserProfile = () => {
    // for LogIn and LogOut check
    const dispatch = useDispatch();
    const { isLoggedIn, userInfo } = useSelector((state) => state.user);
    useEffect(() => {
        if(!isLoggedIn) {
            Router.replace('/');
        }
    }, [isLoggedIn]);

    const [nickname, setNickname] = useInput(userInfo?.nickname || '');
    const [description, setDescription] = useInput(userInfo?.description || '');
    const [infoEditMode, setInfoEditMode] = useState(false);

    const onLogout = useCallback(() => {
        dispatch(logoutAction());
    }, []);

    const onInfoEditMode = useCallback(() => {
        setInfoEditMode(!infoEditMode);
    }, [infoEditMode]);

    const onNicknameSubmit = useCallback(() => {
        if (!nickname) {
            alert('닉네임을 적어주세요!');
        } else if (nickname.length > 20) {
            alert('닉네임은 20자 이내로 적어주세요!');
        } else {
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
                    <div key="register-date">가입일자<br />{userInfo?.createdAt || ''}</div>,
                    <div key="comment">내가 쓴 댓글<br />0</div>,
                    <div key="edit" onClick={onInfoEditMode}>수정하기<br /><EditOutlined className="user-profile-card-edit"  /></div>
                    
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>{nickname[0]}</Avatar>}
                    title={nickname}
                    description={description}
                />
                <Button onClick={onLogout} className='user-profile-logout-btn'>로그아웃</Button>
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