import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import useInput from '../hooks/useInput'

const LoginForm = () => {
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onSubmitForm = useCallback(() => {
        console.log('Submit success!');
        setIsLoggedIn(true);
    }, [email, password])

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