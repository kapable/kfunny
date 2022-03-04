import produce from '../util/produce';
import shortId from 'shortid';
import faker from '@withshepherd/faker';

export const initialState = {
    // mainPosts: [{
    //     id: 1,
    //     User: {
    //         id:1,
    //         nickname: "Seeyong",
    //     },
    //     title: "The first title",
    //     content: 'First comment #Hash #Express',
    //     createdAt: "2022-01-01",
    //     Images: [{
    //         id:shortId.generate(),
    //         src: 'https://images.unsplash.com/photo-1587813368357-9e58f27691b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
    //     }, {
    //         id:shortId.generate(),
    //         src: 'https://images.unsplash.com/photo-1591347887817-173e3d5c4891?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1507&q=80'
    //     }, {
    //         id:shortId.generate(),
    //         src: 'https://images.unsplash.com/photo-1536173375199-161929d85af2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80'
    //     }],
    //     Comments: [{
    //         id:shortId.generate(),
    //         User: {
    //             id:shortId.generate(),
    //             nickname: 'abcd',
    //         },
    //         content: 'Wow',
    //     }, {
    //         id:shortId.generate(),
    //         User: {
    //             id:shortId.generate(),
    //             nickname: 'qwer',
    //         },
    //         content: 'This one!'
    //     }],
    //     Category: {
    //         id:shortId.generate(),
    //         label: "경제"
    //     }
    // }, {
    //     id: 2,
    //     User: {
    //         id:1,
    //         nickname: "Seeyong",
    //     },
    //     title: "The Second title",
    //     content: 'Second comment #Hash #Express',
    //     createdAt: "2022-01-01",
    //     Images: [{
    //         id:shortId.generate(),
    //         src: 'https://images.unsplash.com/photo-1587813368357-9e58f27691b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
    //     }, {
    //         id:shortId.generate(),
    //         src: 'https://images.unsplash.com/photo-1591347887817-173e3d5c4891?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1507&q=80'
    //     }, {
    //         id:shortId.generate(),
    //         src: 'https://images.unsplash.com/photo-1536173375199-161929d85af2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80'
    //     }],
    //     Comments: [{
    //         id:shortId.generate(),
    //         User: {
    //             id:shortId.generate(),
    //             nickname: 'abcd',
    //         },
    //         content: 'Wow',
    //     }, {
    //         id:shortId.generate(),
    //         User: {
    //             id:shortId.generate(),
    //             nickname: 'qwer',
    //         },
    //         content: 'This one!'
    //     },{
    //         id:shortId.generate(),
    //         User: {
    //             id:shortId.generate(),
    //             nickname: 'abcd',
    //         },
    //         content: 'Wow',
    //     }, {
    //         id:shortId.generate(),
    //         User: {
    //             id:shortId.generate(),
    //             nickname: 'qwer',
    //         },
    //         content: 'This one!'
    //     },{
    //         id:shortId.generate(),
    //         User: {
    //             id:shortId.generate(),
    //             nickname: 'abcd',
    //         },
    //         content: 'Wow',
    //     }, {
    //         id:shortId.generate(),
    //         User: {
    //             id:shortId.generate(),
    //             nickname: 'qwer',
    //         },
    //         content: 'This one!'
    //     },{
    //         id:shortId.generate(),
    //         User: {
    //             id:shortId.generate(),
    //             nickname: 'abcd',
    //         },
    //         content: 'Wow',
    //     }, {
    //         id:shortId.generate(),
    //         User: {
    //             id:shortId.generate(),
    //             nickname: 'qwer',
    //         },
    //         content: 'This one!'
    //     },{
    //         id:shortId.generate(),
    //         User: {
    //             id:shortId.generate(),
    //             nickname: 'abcd',
    //         },
    //         content: 'Wow',
    //     }, {
    //         id:shortId.generate(),
    //         User: {
    //             id:shortId.generate(),
    //             nickname: 'qwer',
    //         },
    //         content: 'This one!'
    //     }],
    //     Category: {
    //         id:shortId.generate(),
    //         label: "경제"
    //     }
    // }],
    mainPosts: [],
    imagePaths: [],
    hasMorePosts: true,
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: false,
    addPostLoading: false,
    addPostDone: false,
    addPostError: false,
    removePostLoading: false,
    removePostDone: false,
    removePostError: false,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: false,
};

export const generateDuummyPost = (category_label) => {
    if(category_label !== "최신") {
        return (
            Array(10).fill().map(() => ({
                id: Math.floor(Math.random() * 100),
                title: faker.lorem.sentence(),
                content: faker.lorem.sentences(),
                User: {
                    id: Math.floor(Math.random() * 100),
                    nickname: faker.name.firstName(),
                },
                Images: [{
                    id: shortId.generate(),
                    src: faker.image.imageUrl()
                }, {
                    id: shortId.generate(),
                    src: faker.image.imageUrl()
                }, {
                    id: shortId.generate(),
                    src: faker.image.imageUrl()
                }],
                Comments: Array(15).fill().map(() => ({
                    id:shortId.generate(),
                    User: {
                        id:shortId.generate(),
                        nickname: faker.name.firstName(),
                    },
                    content: faker.lorem.sentence(),
                })),
                createdAt: "2020-12-31",
                Category: {
                    id:shortId.generate(),
                    label: category_label,
                },
            }))
        )
    }
}

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const RESET_KEYWORD_POSTS = 'RESET_KEYWORD_POSTS';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOAD_POSTS_REQUEST:
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                draft.addPostDone = false;
                break;
            case LOAD_POSTS_SUCCESS:
                draft.mainPosts = action.data;
                draft.loadPostsDone = true;
                draft.loadPostsLoading = false;
                draft.hasMorePosts = action.data.length === 10;
                break;
            case LOAD_POSTS_FAILURE:
                draft.loadPostsLoading = false;
                draft.loadPostsError = action.error;
                break;
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.mainPosts.unshift(action.data);
                draft.addPostDone = true;
                draft.addPostLoading = false;
                draft.imagePaths = [];
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
                draft.removePostDone = true;
                draft.removePostLoading = false;
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS:
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                post.Comments.unshift(action.data);
                draft.addCommentDone = true;
                draft.addCommentLoading = false;
                break;
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            case RESET_KEYWORD_POSTS:
                draft.loadPostsLoading = true;
                draft.keywordPosts = [];
            case UPLOAD_IMAGES_REQUEST:
                draft.uploadImagesLoading = true;
                draft.uploadImagesDone = false;
                draft.uploadImagesError = null;
                break;
            case UPLOAD_IMAGES_SUCCESS:
                draft.imagePaths = action.data;
                draft.uploadImagesDone = true;
                draft.uploadImagesLoading = false;
                break;
            case UPLOAD_IMAGES_FAILURE:
                draft.uploadImagesLoading = false;
                draft.uploadImagesError = action.error;
                break;
            case REMOVE_IMAGE:
                draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
                break;
            default:
                break;
        };
    });
};

export default reducer;