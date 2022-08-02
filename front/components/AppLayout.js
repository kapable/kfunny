import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Menu, Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';
import * as gtag from '../lib/gtag';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
    // for LogIn and LogOut check
    const dispatch = useDispatch();
    const { userInfo, logOutDone } = useSelector((state) => state.user);
    const onLogout = useCallback(() => {
        gtag.event({ action: "Click Logout Button", category: "Paging", label: "navigation bar" });
        dispatch({
            type: LOG_OUT_REQUEST
        });
    }, [LOG_OUT_REQUEST]);

    useEffect(() => {
        if(logOutDone) {
            alert('로그아웃 되었습니다!');
        };
    }, [logOutDone]);

    const onHomeButtonClick = useCallback(() => {
        gtag.event({ action: "Click Home logo Button", category: "Paging", label: "navigation bar" });
        return Router.push('/');
    }, []);

    const onSignupButtonClick = useCallback(() => {
        gtag.event({ action: "Click go-to-Signup Button", category: "Paging", label: "navigation bar" });
        return Router.push('/signup');
    }, []);

    const onLoginButtonClick = useCallback(() => {
        gtag.event({ action: "Click go-to-Login Button", category: "Paging", label: "navigation bar" });
        return Router.push('/login');
    }, []);

    const onMyInfoButtonClick = useCallback(() => {
        gtag.event({ action: "Click go-to-Myinfo Button", category: "Paging", label: "navigation bar" });
        return Router.push('/profile');
    }, []);

    return (
        <Layout className='applayout'>
            <Header className='applayout-header'>
                <Menu mode='horizontal' triggerSubMenuAction="click" theme='light'>
                    <Menu.Item key="home" onClick={onHomeButtonClick}><img className='applayout-nav-kfunny-main-logo' src='https://images.niair.xyz/basic/kfunny_logo.png' alt='케이퍼니' /></Menu.Item>
                    <Menu.Item key="divider" disabled={true}>|</Menu.Item>
                    {userInfo 
                    ? (
                    <>
                        <Menu.Item key="profile" onClick={onMyInfoButtonClick}>내 정보</Menu.Item>
                        <Menu.Item key='logout' onClick={onLogout}>로그아웃</Menu.Item>
                    </>
                    )
                    : (
                    <>
                        <Menu.Item key="signup" onClick={onSignupButtonClick} >회원가입</Menu.Item>
                        <Menu.Item key="login" onClick={onLoginButtonClick} >로그인</Menu.Item>
                    </>)}
                </Menu>
            </Header>
            <Content className='applayout-content'>
                {children}
            </Content>
            <Footer className='applayout-footer'>
                광고 및 후원 문의<br></br>
                Advertising and Sponsorship Contact<br></br>
                soumy21@naver.com<br></br>
                <br></br>
                Also service..<br></br>
                <a href='https://ktestone.com/' target="_blank" rel='noreferrer noopener'>🔗 케이테스트</a><br></br>
                <a href='https://jellinggame.com/' target="_blank" rel='noreferrer noopener'>🔗 젤링게임즈</a><br></br>
                <br></br>
                Disclaimer:<br></br>
                All content is provided for fun and entertainment purposes only<br></br>
                ©주식회사 쿠키로켓 All Rights Reserved. 2022.
            </Footer>
        </Layout>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;