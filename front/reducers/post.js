import shortId from 'shortid';
import faker from '@withshepherd/faker';

export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id:1,
            nickname: "Seeyong",
        },
        title: "The first title",
        content: 'First comment #Hash #Express',
        createdAt: "2022-01-01",
        Images: [{
            id:shortId.generate(),
            src: 'https://images.unsplash.com/photo-1587813368357-9e58f27691b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
        }, {
            id:shortId.generate(),
            src: 'https://images.unsplash.com/photo-1591347887817-173e3d5c4891?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1507&q=80'
        }, {
            id:shortId.generate(),
            src: 'https://images.unsplash.com/photo-1536173375199-161929d85af2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80'
        }],
        Comments: [{
            id:shortId.generate(),
            User: {
                id:shortId.generate(),
                nickname: 'abcd',
            },
            content: 'Wow',
        }, {
            id:shortId.generate(),
            User: {
                id:shortId.generate(),
                nickname: 'qwer',
            },
            content: 'This one!'
        }],
        Category: {
            id:shortId.generate(),
            value:"economics",
            label: "경제"
        }
    }, {
        id: 2,
        User: {
            id:1,
            nickname: "Seeyong",
        },
        title: "The Second title",
        content: 'Second comment #Hash #Express',
        createdAt: "2022-01-01",
        Images: [{
            id:shortId.generate(),
            src: 'https://images.unsplash.com/photo-1587813368357-9e58f27691b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
        }, {
            id:shortId.generate(),
            src: 'https://images.unsplash.com/photo-1591347887817-173e3d5c4891?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1507&q=80'
        }, {
            id:shortId.generate(),
            src: 'https://images.unsplash.com/photo-1536173375199-161929d85af2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80'
        }],
        Comments: [{
            id:shortId.generate(),
            User: {
                id:shortId.generate(),
                nickname: 'abcd',
            },
            content: 'Wow',
        }, {
            id:shortId.generate(),
            User: {
                id:shortId.generate(),
                nickname: 'qwer',
            },
            content: 'This one!'
        },{
            id:shortId.generate(),
            User: {
                id:shortId.generate(),
                nickname: 'abcd',
            },
            content: 'Wow',
        }, {
            id:shortId.generate(),
            User: {
                id:shortId.generate(),
                nickname: 'qwer',
            },
            content: 'This one!'
        },{
            id:shortId.generate(),
            User: {
                id:shortId.generate(),
                nickname: 'abcd',
            },
            content: 'Wow',
        }, {
            id:shortId.generate(),
            User: {
                id:shortId.generate(),
                nickname: 'qwer',
            },
            content: 'This one!'
        },{
            id:shortId.generate(),
            User: {
                id:shortId.generate(),
                nickname: 'abcd',
            },
            content: 'Wow',
        }, {
            id:shortId.generate(),
            User: {
                id:shortId.generate(),
                nickname: 'qwer',
            },
            content: 'This one!'
        },{
            id:shortId.generate(),
            User: {
                id:shortId.generate(),
                nickname: 'abcd',
            },
            content: 'Wow',
        }, {
            id:shortId.generate(),
            User: {
                id:shortId.generate(),
                nickname: 'qwer',
            },
            content: 'This one!'
        }],
        Category: {
            id:shortId.generate(),
            value:"economics",
            label: "경제"
        }
    }],
    postCategories: [{
        id:shortId.generate(),
        value:"economics",
        label: "경제"
    }, {
        id:shortId.generate(),
        value:"politics",
        label: "정치"
    }, {
        id:shortId.generate(),
        value:"gossip",
        label: "연예"
    }, {
        id:shortId.generate(),
        value:"society",
        label: "사회"
    },{
        id:shortId.generate(),
        value:"culture",
        label: "문화"
    },{
        id:shortId.generate(),
        value:"history",
        label: "역사"
    }],
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: false,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: false,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

const dummyPost = {
    id: 2,
    title: '더미 타이틀',
    content: '더미 콘텐트',
    User: {
        id: 2,
        nickname: 'abcd',
    },
    Images: [{
        id:shortId.generate(),
        src: 'https://images.unsplash.com/photo-1536173375199-161929d85af2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80'
    }],
    Comments: [],
    createdAt: "2022-01-02",
    Category: {
        id:shortId.generate(),
        value:"economics",
        label: "경제"
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return {
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null,
            }
        case ADD_POST_SUCCESS:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                addPostDone: true,
                addPostLoading: false,
                imagePaths: []
            }
        case ADD_POST_FAILURE:
            return {
                addPostLoading: false,
                addPostError: action.error,
            }
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null,
            }
        case ADD_COMMENT_SUCCESS:
            const postIndex = state.mainPosts.findIndex((v) => v.id === parseInt(action.data.postId, 10));
            const post = { ...state.mainPosts[postIndex] };
            post.Comments = [
                {
                    id: action.data.postId,
                    User: {
                        id: action.data.userId,
                        nickname: 'WWW'
                    },
                    content: action.data.content
                },
                ...post.Comments
            ]
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = post;
            return {
                ...state,
                mainPosts,
                addCommentDone: true,
                addCommentLoading: false,

            }
        case ADD_COMMENT_FAILURE:
            return {
                addCommentLoading: false,
                addCommentError: action.error,
            }
        default:{
            return {
                ...state
            };
        }
    };
};

export default reducer;