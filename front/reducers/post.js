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
        Category: [{
            id:shortId.generate(),
            content: "경제"
        }, {
            id:shortId.generate(),
            content: "정치"
        }, {
            id:shortId.generate(),
            content: "연예"
        }]
    }],
    postCategories: [{
        id:shortId.generate(),
        content: "경제"
    }, {
        id:shortId.generate(),
        content: "정치"
    }, {
        id:shortId.generate(),
        content: "연예"
    }, {
        id:shortId.generate(),
        content: "사회"
    },{
        id:shortId.generate(),
        content: "문화"
    },{
        id:shortId.generate(),
        content: "역사"
    }],
    imagePost: [],
    postAdded: false,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});

const dummyPost = (data) => ({
    id: data.id,
    title: data.title,
    content: data.content,
    User: {
        id: 1,
        nickname: 'abcd',
    },
    Images: [],
    Comments: [],
    createdAt: "2022-01-02",
    Category: [],
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true,
            }
        default:{
            return {
                ...state
            };
        }
    };
};

export default reducer;