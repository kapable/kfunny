import React, { Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Space, Image } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { REMOVE_POST_REQUEST } from '../../reducers/post';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const { Column, ColumnGroup } = Table;

const PostList = () => {
    const dispatch = useDispatch();
    const { mainPosts } = useSelector((state) => state.post);
    const onShareButtonClick = useCallback(() => {
        alert('링크가 복사되었습니다!');
    }, []);
    
    const onRemovePost = useCallback((id) => {
        if (confirm("정말로 삭제하시겠습니까?\n삭제된 게시물은 복구가 불가능합니다.") === true) {
            return dispatch({
                type: REMOVE_POST_REQUEST,
                data: id,
            });
        }
    }, []);
    return (
        <Fragment>
            <Table pagination={{ pageSize: 10 }} dataSource={mainPosts} key="table" rowKey={post => post.id}>
                <Column title="No." dataIndex="id" key="post-id" />
                <Column title="제목" dataIndex="title" key="title" />
                <Column
                    title="링크" key="link-copy"
                    render={(_, post) => (
                        <CopyToClipboard
                            text={`https://niair.xyz/post/${post.id}`}
                            onCopy={onShareButtonClick}
                        ><div><LinkOutlined /></div></CopyToClipboard>
                    )}
                />
                <Column title="미리보기" key="preview" render={(_, post) => (
                    <Image width={70} src={post.Images[0].src} alt={post.title} />
                )}/>
                <ColumnGroup title="수정/삭제">
                    <Column
                        title="수정" key="edit"
                        render={() => (
                            <Space size="middle">
                                <a>수정하기</a>
                            </Space>
                        )}
                    />
                    <Column
                        title="삭제" key="delete"
                        dataIndex="id"
                        render={(id) => (
                            <Space size="middle">
                                <a onClick={() => onRemovePost(id)}>삭제하기</a>
                            </Space>
                        )}
                    />
                </ColumnGroup>
                <Column title="작성일" dataIndex="createdAt" key="createdAt" />
            </Table>
        </Fragment>
    );
};

export default PostList;