import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, Select, Input, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { ADD_POST_REQUEST } from '../../reducers/post';
import useInput from '../../hooks/useInput';
import Router from 'next/router';

const { Option } = Select;

const Upload = () => {
  const dispatch = useDispatch();
  const { imagePaths, postCategories, addPostLoading, addPostDone } = useSelector((state) => state.post);
  const [category, setCategory] = useState('');
  const [title, onChangeTitle] = useInput('');
  const imageInput = useRef();

  useEffect(() => {
    if(addPostDone) {
      alert('게시물이 성공적으로 업로드 되었습니다!');
      Router.push('/admin/posts');
    }
  }, [addPostDone]);

  const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
        imageFormData.append('image', f);
    });
    // dispatch({
    //   type: UPLOAD_IMAGES_REQUEST,
    //   data: imageFormData,
    // });
  }, []);

  const onRemoveImage = useCallback((index) => () => {
    // dispatch({
    //     type: REMOVE_IMAGE,
    //     data: index,
    // });
    console.log('remove image');
}, []);

  const onSubmit = useCallback(() => {
    dispatch({
      type: ADD_POST_REQUEST,
      data: title,
    })
  }, [title, category, imagePaths]);

  return (
    <Form className='admin-upload-form' encType="multipart/form-data" onFinish={onSubmit}>
        <Input className='admin-upload-title-input' value={title} showCount maxLength={30} onChange={onChangeTitle} placeholder="제목을 써주세요!" allowClear={true} />
        <h1 className='admin-upload-title-preview'>{title}</h1>
        <Divider dashed />
        <div>
            <input type="file" name='image' multiple hidden ref={imageInput} onChange={onChangeImages} />
            <Button className='admin-upload-img-btn' onClick={onClickImageUpload}><PlusOutlined  /><br />사진 업로드</Button>
        </div>
        <div>
            {imagePaths.map((v, i) => (
                <div key={v} className='admin-upload-img-preview-div'>
                    <img src={`${backUrl}/${v}`} className='admin-upload-img-preview' alt={v} />
                    <div>
                        <Button onClick={onRemoveImage(i)}>Delete</Button>
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
          {postCategories.map((postCategory) => (
            <Option value={postCategory.value} label={postCategory.label} key={`${postCategory.value}_category`}>
              {postCategory.label}
            </Option>
          ))}
        </Select>
        <Button className='admin-upload-submit-btn' type="primary" htmlType="submit" loading={addPostLoading} >Post!</Button>
    </Form>
  );
};

export default Upload;