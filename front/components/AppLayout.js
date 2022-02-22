import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../reducers';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
    // for LogIn and LogOut check
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const onLogout = useCallback(() => {
        dispatch(logoutAction());
    }, []);
    
    return (
        <Layout className='applayout'>
            <Header className='applayout-header'>
                <Menu mode='horizontal' triggerSubMenuAction="click" theme='light'>
                    <Menu.Item key="home"><Link href='/'><a>케이퍼니</a></Link></Menu.Item>
                    <Menu.Item key="divider" disabled={true}>|</Menu.Item>
                    {isLoggedIn 
                    ? (
                    <>
                        <Menu.Item key="profile"><Link href='/profile'><a>내 정보</a></Link></Menu.Item>
                        <Menu.Item key='logout' onClick={onLogout}>로그아웃</Menu.Item>
                    </>
                    )
                    : (
                    <>
                        <Menu.Item key="signup" ><Link href='/signup'><a>회원가입</a></Link></Menu.Item>
                        <Menu.Item key="login" ><Link href='/login'><a>로그인</a></Link></Menu.Item>
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