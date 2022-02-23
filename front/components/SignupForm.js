import React, { useState, useCallback } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import useInput from '../hooks/useInput';
import styled from 'styled-components';

const ErrorMessage = styled.div`
    color: red;
`;

const SignupForm = () => {

    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback(
        (e) => {
            setPasswordCheck(e.target.value);
            setPasswordError(e.target.value !== password);
        },
        [password],
    )
    
    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback(
        (e) => {
            setTerm(e.target.checked);
            setTermError(false);
        },
        [],
    )

    const onSubmit = useCallback(
        () => {
            if(password !== passwordCheck) {
                return setPasswordError(true);
            }
            if(!term) {
                return setTermError(true);
            }
            console.log({ email, nickname, password });
        },
        [password, passwordCheck, setPasswordError, term, setTermError, email, nickname],
    )

    return (
        <Form onFinish={onSubmit} layout="vertical" className='signup-form'>
            <div>
                <Form.Item htmlFor="user-email" required label="이메일">
                    <Input name="user-email" type="email" value={email} required onChange={onChangeEmail}/>
                </Form.Item>
            </div>
            <div>
                <Form.Item htmlFor="user-nick" required label="닉네임">
                    <Input name="user-nick" value={nickname} required onChange={onChangeNickname}/>
                </Form.Item>
            </div>
            <div>
                <Form.Item htmlFor="user-password" required label="비밀번호">
                    <Input name="user-password" type="password" value={password} required onChange={onChangePassword}/>
                </Form.Item>
            </div>
            <div>
                <Form.Item htmlFor="user-password-check" required label="비밀번호 확인">
                    <Input
                        name="user-password-check"
                        type="password"
                        value={passwordCheck}
                        required
                        onChange={onChangePasswordCheck}
                    />
                </Form.Item>
                {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
            </div>
            <div>
                <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>체크 후 가입시 개인정보활용 방침에 동의합니다.</Checkbox>
                {termError && <ErrorMessage>개인정보활용방침 동의 후 가입이 가능합니다.</ErrorMessage>}
            </div>
            <div className='signup-form-button-group'>
                <Button type="primary" htmlType="submit">회원가입</Button>
            </div>
        </Form>
    );
};

export default SignupForm;