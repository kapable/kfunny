import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu } from 'antd';

const AppLayout = ({ children }) => {
    return (
        <div>
            <Menu mode='horizontal' triggerSubMenuAction="click" theme='light'>
                <Menu.Item key="home"><Link href='/'><a>케이퍼니</a></Link></Menu.Item>
                <Menu.Item disabled={true}>|</Menu.Item>
                <Menu.Item key="signup" ><Link href='/signup'><a>회원가입</a></Link></Menu.Item>
                <Menu.Item key="login" ><Link href='/login'><a>로그인</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href='/profile'><a>내 정보</a></Link></Menu.Item>
            </Menu>
            {children}
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;