import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'antd';
import { EditOutlined, OrderedListOutlined, TagsOutlined, QuestionOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

const Admin = () => {
    const dispatch = useDispatch();
    const { userInfo, logInDone } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch({
            type: LOAD_MY_INFO_REQUEST
        });
    }, []);
    
    // useEffect(() => {
    //     if(!userInfo?.admin) {
    //         alert('관리자 로그인이 필요합니다!');
    //         Router.replace('/login');
    //     }
    // }, [userInfo, logInDone]);

    return (
        <Fragment>
            <Row className='admin-index-row'>
                <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12} >
                    <Link href='/admin/upload'><a><EditOutlined /><br />새로운 포스트 올리기</a></Link>
                </Col>
                <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12}>
                    <Link href='/admin/posts'><a><OrderedListOutlined /><br />기존 리스트 보기</a></Link>
                </Col>
                <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12}>
                    <Link href='/admin/category'><a><TagsOutlined /><br />카테고리 편집</a></Link>
                </Col>
                <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12}>
                    <QuestionOutlined /><br />기존 리스트 보기
                </Col>
            </Row>
        </Fragment>
    );
};

export default Admin;