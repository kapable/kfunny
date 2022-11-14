import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Input, Select } from 'antd';
import useInput from '../hooks/useInput';
import { useRouter } from 'next/router';

const QuillNoSSRWrapper = dynamic(async () => {
    const { default: RQ } = await import('react-quill');
    return function comp({ forwardedRef, ...props }) {
        return <RQ ref={forwardedRef} {...props} />;
    };
}, { ssr: false });

import React, { useState, useMemo, useRef, useCallback } from 'react';
import axios from 'axios';
import { backUrl } from '../config/config';
import { useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { ADD_ARTICLE_REQUEST, EDIT_ARTICLE_REQUEST } from '../reducers/article';

const { Option } = Select;

const ArticleUploadEditor = ({ contents, isNewContents }) => {
    const quillRef = useRef(null);
    const router = useRouter();
    const dispatch = useDispatch();
    const { postCategories } = useSelector((state) => state.category);
    const { userInfo } = useSelector((state) => state.user);
    const { addArticleDone, addArticleLoading, editArticleDone, editArticleLoading } = useSelector((state) => state.article);
    const [title, onChangeTitle] = useInput(contents?.title || '');
    const [category, setCategory] = useState(contents?.Categories ? contents?.Categories[0].label :'');
    const [content, setContent] = useState(contents?.contents || "");
    const [isNew, setIsNew] = useState(isNewContents); // upload Or Edit

    useEffect(() => {
        if(addArticleDone) {
            alert('게시물이 성공적으로 업로드 되었습니다!');
            router.push(`/`);
        }
    }, [addArticleDone]);

    useEffect(() => {
        if(editArticleDone) {
            alert('게시물이 성공적으로 수정 되었습니다!');
            router.push(`/`);
        }
    }, [editArticleDone]);

    const imageHandler = () => {
        // 1. 이미지를 저장할 input type=file DOM을 만든다.
        const input = document.createElement('input');
        // 속성 써주기
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.setAttribute("multiple","");
        input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
        // input이 클릭되면 파일 선택창이 나타난다.

        // input에 변화가 생긴다면 = 이미지를 선택
        input.addEventListener('change', async () => {
            // const file = input.files[0];
            // multer에 맞는 형식으로 데이터 만들어준다.
            const formData = new FormData();
            [].forEach.call(input.files, (f) => {
                formData.append('image', f);
            });
            // formData.append('image', file); // formData는 키-밸류 구조
            // 백엔드 multer라우터에 이미지를 보낸다.
            try {
                const result = await axios.post(`${backUrl}/article/images`, formData, { withCredentials: true });
                result.data.map((url) => {
                    const editor = quillRef.current.getEditorSelection(); // // 2. 현재 에디터 커서 위치값을 가져온다 + 에디터 객체 가져오기
                    quillRef.current.getEditor().insertEmbed(editor.index, 'image', url.replace(/\/resized\//, '/original/')); // 가져온 위치에 이미지를 삽입한다
                    quillRef.current.getEditor().setSelection(editor.index + 1);
                });
            } catch (error) {
                alert('이미지 업로드 중 에러가 발생했습니다 ㅠㅠ');
                console.error('IMG UPLOAD ERROR', error);
            };
        });
    };

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    ['image'],
                ],
                handlers: {
                    image: imageHandler,
                },
                clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                    matchVisual: false,
                },
            },
        }
    }, []);

    const formats = [
        'image',
    ];

    const onSubmit = useCallback(() => {
        if(!title || !title.trim()) {
            return alert('제목을 입력하세요!');
        };
        if(!category) {
            return alert('게시판을 선택하세요!');
        };
        if(!content || content === '<p><br></p>') {
            return alert('글을 작성해주세요!');
        };
        isNew
        ? ( // upload a new article
            dispatch({
                type: ADD_ARTICLE_REQUEST,
                data: { title, category, content }
            })
        )
        : ( // edit a exist article
            dispatch({
                type: EDIT_ARTICLE_REQUEST,
                data: { articleId: contents?.id, title, category, content }
            })
        )
    }, [title, category, content, contents]);

    return (
        <div className='upload-main-div'>
            <Form encType="multipart/form-data" acceptCharset="UTF-8" onFinish={onSubmit}>
                {/* TITLE */}
                <Input className='admin-upload-title-input' value={title} required showCount maxLength={30} onChange={onChangeTitle} placeholder="제목을 써주세요!" allowClear={true} />
                <h1 className='admin-upload-title-preview'>{title}</h1>

                {/* CATEGORY SELECT */}
                <Select
                    className='admin-upload-category-select'
                    placeholder="카테고리를 골라주세요"
                    optionLabelProp="label"
                    onChange={setCategory}
                    value={category}
                >
                    {postCategories.slice(1).map((postCategory) => ( // except 최신 related to slice
                    <Option value={postCategory.label} label={postCategory.label} key={`${postCategory.label}_category`}>
                        {postCategory.label}
                    </Option>
                    ))}
                </Select>

                {/* Editor Main */}
                <QuillNoSSRWrapper
                    className="upload-editor-quill"
                    forwardedRef={quillRef}
                    onChange={setContent}
                    value={content}
                    modules={modules}
                    formats={formats}
                    placeholder="글과 사진으로 여러분의 이야기를 들려주세요 : )"
                    theme="snow"
                />

                {/* Submit Button */}
                <Button className='admin-upload-submit-button' type='primary' htmlType="submit" loading={addArticleLoading || editArticleLoading} ><UploadOutlined /> 업로드</Button>
            </Form>
        </div>
    );
};

export default ArticleUploadEditor;