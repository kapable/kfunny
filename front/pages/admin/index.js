import React, { Fragment } from 'react';
import { Row, Col } from 'antd';
import { EditOutlined, OrderedListOutlined } from '@ant-design/icons';
import Link from 'next/link';

const Admin = () => {
    return (
        <Fragment>
            <Row className='admin-index-row'>
                <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12} >
                    <Link href='/admin/upload'><a><EditOutlined /><br />새로운 포스트 올리기</a></Link>
                </Col>
                <Col className='admin-index-col' xs={24} sm={24} md={12} lg={12}>
                    <Link href='/admin/posts'><a><OrderedListOutlined /><br />기존 리스트 보기</a></Link>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Admin;