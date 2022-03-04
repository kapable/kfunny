import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Tag, Input } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CATEGORY_REQUEST, LOAD_CATEGORIES_REQUEST, SET_CATEGORY_REQUEST } from '../../reducers/category';
import useInput from '../../hooks/useInput';
import { END } from 'redux-saga';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import Head from 'next/head';
import Router from 'next/router';

const { CheckableTag } = Tag;

const Category = () => {
    const dispatch = useDispatch();
    const { postCategories, setCategoryDone, setCategoryLoading, setCategoryError, addCategoryDone, addCategoryLoading, addCategoryError } = useSelector((state) => state.category);
    const { userInfo } = useSelector((state) => state.user);
    const [inputVisible, setInputVisible] = useState('');
    const [newCategory, handleNewCategory, setNewCategory] = useInput('');

    useEffect(() => {
        if(!userInfo?.admin) {
            alert('관리자 로그인이 필요합니다!');
            Router.replace('/login');
        }
    }, [userInfo]);

    useEffect(() => {
        if(setCategoryDone) {
            alert('설정이 변경되었습니다!');
        };
        if(setCategoryError) {
            alert('설정 변경에 실패했습니다 ㅠㅠ');
        };
    }, [setCategoryDone, setCategoryError]);

    useEffect(() => {
        if(addCategoryDone) {
            alert('새로운 카테고리가 추가되었습니다!');
        }
        if(addCategoryError) {
            alert(addCategoryError);
        }
    }, [addCategoryDone, addCategoryError]);

    const onCheckChange = (v, checked) => {
        dispatch({
            type: SET_CATEGORY_REQUEST,
            data: { v, checked },
        })
    }

    const onInputSubmit = useCallback(() => {
        if(newCategory === '') {
            return alert('카테고리를 입력해주세요');
        } else {
            dispatch({
                type: ADD_CATEGORY_REQUEST,
                data: { newCategory },
            })
            setNewCategory('');
            setInputVisible(false);
        }
    }, [newCategory]);

    return (
        <Fragment>
            <Head>
                <meta charSet='utf-8'/>
                <title>카테고리 편집 | 케이퍼니</title>
            </Head>
            <h1>카테고리 목록</h1>
            {postCategories.map((v) => (
                <CheckableTag
                    key={v.label}
                    checked={v.enabled}
                    onChange={(checked) => onCheckChange(v.label, checked)}
                    >{setCategoryLoading? <LoadingOutlined /> : v.label}</CheckableTag>
            ))}
            {addCategoryLoading
            ? (<LoadingOutlined />)
            : (
                inputVisible
                ? (
                    <Input
                        type="text"
                        size="small"
                        value={newCategory}
                        onChange={handleNewCategory}
                        onPressEnter={() => onInputSubmit(newCategory)}
                        onBlur={() => setInputVisible(false)}
                        className="admin-category-new-input"
                    />
                )
                : (<Tag
                    onClick={() => setInputVisible(true)}
                    className='admin-category-add-new-tag'>
                        <PlusOutlined /> 새로운 태그 추가
                </Tag>
                )
            )
            }
        </Fragment>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST
    });
    context.store.dispatch({
        type: LOAD_CATEGORIES_REQUEST
    });
    context.store.dispatch(END)

    await context.store.sagaTask.toPromise()
});

export default Category;