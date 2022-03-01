import React, { useState, useCallback, useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import Router from 'next/router';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';

const ErrorMessage = styled.div`
    color: red;
`;

const SignupForm = () => {
    const dispatch = useDispatch();
    const { signUpDone, signUpError, signUpLoading } = useSelector((state) => state.user);

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

    useEffect(() => {
        if (signUpDone) {
            alert("회원가입에 성공했습니다!");
            Router.replace('/login');
        }

        if (signUpError) {
            alert('회원가입 에러가 발생했습니다. 다시 시도해주세요 ㅠㅠ');
        }
    }, [signUpDone, signUpError]);

    const onSubmit = useCallback(
        () => {
            if(password !== passwordCheck) {
                return setPasswordError(true);
            }
            if(!term) {
                return setTermError(true);
            }
            dispatch({
                type: SIGN_UP_REQUEST,
                data: { email, nickname, password }
            })
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
                <Button type="primary" htmlType="submit" loading={signUpLoading} >회원가입</Button>
            </div>
        </Form>
    );
};

export default SignupForm;