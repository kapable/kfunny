import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import useInput from '../hooks/useInput'
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../reducers';

const LoginForm = () => {
    // for LogIn and LogOut check
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    useEffect(() => {
        if(isLoggedIn) {
            Router.replace('/');
        }
    }, [isLoggedIn]);

    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onSubmitForm = useCallback(() => {
        dispatch(loginAction({ email, password }));
    }, [email, password]);


    return (
        <Form className='login-form' onFinish={onSubmitForm} layout="vertical">
            <div>
                <Form.Item required htmlFor='user-email' label="이메일">
                    <Input placeholder='kfunny@kfunny.com' name='user-email' type="email" value={email} onChange={onChangeEmail} required />
                </Form.Item>
            </div>
            <div>
                <Form.Item required htmlFor='user-passwrod' label="비밀번호">
                    <Input name='user-passwrod' type='password' value={password} onChange={onChangePassword} required />
                </Form.Item>
            </div>
            <div>
                <div className='login-form-button-group'>
                    <Button type='primary' htmlType='submit'>로그인</Button>
                    <Link href='/signup'><a><Button>회원가입</Button></a></Link>
                </div>
            </div>
        </Form>
    );
};

export default LoginForm;