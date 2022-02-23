import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Space, Image } from 'antd';

const { Column, ColumnGroup } = Table;

const PostList = () => {
    const dispatch = useDispatch();
    const { mainPosts } = useSelector((state) => state.post);
    return (
        <Fragment>
            <Table pagination={{ pageSize: 10 }} dataSource={mainPosts} key="table" rowKey={post => post.id}>
                <Column title="No." dataIndex="id" key="post-id" />
                <Column title="제목" dataIndex="title" key="title" />
                <Column title="미리보기" key="preview" render={(_, post) => (
                    <Image width={100} src={post.Images[0].src} alt={post.title} />
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
                        render={() => (
                            <Space size="middle">
                                <a>삭제하기</a>
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