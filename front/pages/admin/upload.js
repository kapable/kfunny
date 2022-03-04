import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, Select, Input, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST } from '../../reducers/post';
import { LOAD_CATEGORIES_REQUEST } from '../../reducers/category';
import useInput from '../../hooks/useInput';
import Router from 'next/router';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../../store/configureStore';
import Head from 'next/head';


const { Option } = Select;

const Upload = () => {
  const dispatch = useDispatch();
  const { imagePaths, addPostLoading, addPostDone } = useSelector((state) => state.post);
  const { postCategories } = useSelector((state) => state.category);
  const { userInfo } = useSelector((state) => state.user);
  const [category, setCategory] = useState('');
  const [title, onChangeTitle, setTitle] = useInput('');
  const imageInput = useRef(null);

  useEffect(() => {
    if(addPostDone) {
      alert('게시물이 성공적으로 업로드 되었습니다!');
      Router.reload();
    }
  }, [addPostDone]);

  useEffect(() => {
    if(!(userInfo?.admin)) {
        alert('관리자 로그인이 필요합니다!');
        Router.replace('/login');
    }
  }, [userInfo]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
    }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
        imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback((index) => () => {
    dispatch({
        type: REMOVE_IMAGE,
        data: index,
    });
}, []);

  const onSubmit = useCallback(() => {
    if(!userInfo) {
      return alert('관리자 로그인이 필요합니다!');
    }
    if(!title || !title.trim()) {
      return alert('제목을 입력하세요!');
    };
    if(!category) {
      return alert('카테고리를 선택하세요!');
    };
    if(!imagePaths) {
      return alert('이미지를 등록하세요!');
    };
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });

    dispatch({
      type: ADD_POST_REQUEST,
      // data: { title, category, imagePaths },
      data: formData
    });
  }, [userInfo, title, category, imagePaths]);

  return (
    <Fragment>
      <Head>
        <meta charSet='utf-8'/>
        <title>게시물 업로드 | 케이퍼니</title>
      </Head>
      
      <Form className='admin-upload-form' encType="multipart/form-data" onFinish={onSubmit}>
          <Input className='admin-upload-title-input' value={title} showCount maxLength={30} onChange={onChangeTitle} placeholder="제목을 써주세요!" allowClear={true} />
          <h1 className='admin-upload-title-preview'>{title}</h1>
          <Divider dashed />
          <div>
              <input key={imagePaths.join()} type="file" name='image' multiple hidden ref={imageInput} onChange={onChangeImages} />
              <Button className='admin-upload-img-btn' onClick={onClickImageUpload}><PlusOutlined  /><br />사진 업로드</Button>
          </div>
          <div>
              {imagePaths.map((v, i) => (
                  <div key={v} className='admin-upload-img-preview-div'>
                      <img src={`http://localhost:3065/${v}`} className='admin-upload-img-preview' alt={v} />
                      <div className='admin-upload-img-delete-btn-div'>
                          <Button className='admin-upload-img-delete-btn' onClick={onRemoveImage(i)}>Delete</Button>
                      </div>
                  </div>
              ))}
          </div>
          <Select
            className='admin-upload-category-select'
            placeholder="카테고리를 골라주세요"
            optionLabelProp="label"
            onChange={setCategory}
          >
            {postCategories.slice(1).map((postCategory) => ( // except 최신 related to slice
              <Option value={postCategory.label} label={postCategory.label} key={`${postCategory.label}_category`}>
                {postCategory.label}
              </Option>
            ))}
          </Select>
          <Button className='admin-upload-submit-btn' type="primary" htmlType="submit" loading={addPostLoading} >Post!</Button>
      </Form>
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

export default Upload;