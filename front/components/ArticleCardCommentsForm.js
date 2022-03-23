import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Comment, List } from 'antd';
import moment from 'moment';

moment.locale('ko');

const ArticleCardCommentsForm = ({ comments }) => {
    return (
        <div className='article-comment-list-div'>
                <List
                    className='article-comment-list'
                    header={`${comments.length}개의 댓글`}
                    dataSource={comments}
                    itemLayout="horizontal"
                    renderItem={(item) => (
                        <li>
                            <Comment
                                author={item.User.nickname}
                                avatar={(
                                    <Avatar>{item.User.nickname[0]}</Avatar>
                                )}
                                content={item.content}
                                datetime={moment(item.createdAt).format('YYYY-MM-DD')}
                            />
                        </li>
                    )}
                />
            </div>
    );
};

ArticleCardCommentsForm.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string
    }))
};

export default ArticleCardCommentsForm;