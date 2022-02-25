import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import useInput from '../hooks/useInput';
import { useSelector } from 'react-redux';

const CommentForm = ({ singlePost }) => {
    const { isLoggedIn } = useSelector((state) => state.user);
    const userId = useSelector((state) => state.user.userInfo? state.user.userInfo.id: null);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');
    const onSubmitComment = useCallback(() => {
        // dispatch({
        //     type: ADD_COMMENT_REQUEST,
        //     data: { content: commentText, postId: post.id, userId: id }
        // })
        console.log(singlePost.id, commentText);
    }, [commentText, singlePost]);

    return (
        <div className='comment-form'>
            <Form onFinish={onSubmitComment}>
            <Form.Item className='comment-form-items'>
                <Input.TextArea
                    placeholder={isLoggedIn ? '댓글을 입력해주세요(최대 140자).' : '로그인 후 댓글 입력이 가능합니다.'}
                    allowClear={true}
                    maxLength={140}
                    showCount={true}
                    className='comment-form-textarea'
                    value={commentText}
                    onChange={onChangeCommentText}
                    autoSize={{maxRows: 8}}
                    disabled={isLoggedIn ? false : true}
                    />
                <Button
                    className='comment-form-submit-btn'
                    type="primary"
                    htmlType="submit"
                    disabled={isLoggedIn ? false : true}
                    // loading={addCommentLoading}
                    >등록</Button>
            </Form.Item>
        </Form>
            <p>* 타인에게 불쾌감을 주는 욕설, 모욕적인 표현 등은 표기 불가 텍스트로 지정되어 노출이 제한됩니다.</p>
        </div>
    );
};

CommentForm.propTypes = {
    singlePost: PropTypes.object.isRequired,
};

export default CommentForm;