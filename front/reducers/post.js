import produce from '../util/produce';

export const initialState = {
    mainPosts: [],
    singlePost: {
        id: -10,
        User: {
            id: "Kfunny",
            nickname: "Kfunny",
        },
        title: "The first title",
        content: 'First comment #Hash #Express',
        createdAt: "2022-01-01",
        Images: [{
            id:"Kfunny",
            src: '1_1646486661931.png'
        }, ],
        Thumbnails: [{
            id:"Kfunny",
            src: '1_1646486661931.png'
        }, ],
        Comments: [{
            id:35,
            User: {
                id:"Kfunny",
                nickname: 'abcd',
            },
            content: 'Wow',
        }, ],
        Categories: [{
            id:"Kfunny",
            label: "economics"
        }]
    },
    imagePaths: [],
    thumbnailPath: [],
    coupangCookie: false || null,
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
    setPostTitleLoading: false,
    setPostTitleDone: false,
    setPostTitleError: false,
    setPostTextLoading: false,
    setPostTextDone: false,
    setPostTextError: false,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: false,
};

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const SET_POST_TITLE_REQUEST = 'SET_POST_TITLE_REQUEST';
export const SET_POST_TITLE_SUCCESS = 'SET_POST_TITLE_SUCCESS';
export const SET_POST_TITLE_FAILURE = 'SET_POST_TITLE_FAILURE';

export const SET_POST_TEXT_REQUEST = 'SET_POST_TEXT_REQUEST';
export const SET_POST_TEXT_SUCCESS = 'SET_POST_TEXT_SUCCESS';
export const SET_POST_TEXT_FAILURE = 'SET_POST_TEXT_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const UPLOAD_THUMBNAIL_REQUEST = 'UPLOAD_THUMBNAIL_REQUEST';
export const UPLOAD_THUMBNAIL_SUCCESS = 'UPLOAD_THUMBNAIL_SUCCESS';
export const UPLOAD_THUMBNAIL_FAILURE = 'UPLOAD_THUMBNAIL_FAILURE';

export const RESET_KEYWORD_POSTS = 'RESET_KEYWORD_POSTS';

export const SET_COUPANG_COOKIE = 'SET_COUPANG_COOKIE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const REMOVE_THUMBNAIL = 'REMOVE_THUMBNAIL';

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOAD_POSTS_REQUEST:
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;
            case LOAD_POSTS_SUCCESS:
                draft.mainPosts = draft.mainPosts.concat(action.data.slice(0, 50));
                draft.loadPostsDone = true;
                draft.loadPostsLoading = false;
                draft.hasMorePosts = action.data.length === 51;
                break;
            case LOAD_POSTS_FAILURE:
                draft.loadPostsLoading = false;
                draft.loadPostsError = action.error;
                break;
            case LOAD_POST_REQUEST:
                draft.loadPostLoading = true;
                draft.loadPostDone = false;
                draft.loadPostError = null;
                break;
            case LOAD_POST_SUCCESS:
                draft.singlePost = action.data;
                draft.loadPostDone = true;
                draft.loadPostLoading = false;
                draft.hasMorePosts = action.data.length === 10;
                break;
            case LOAD_POST_FAILURE:
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
            case SET_POST_TITLE_REQUEST:
                draft.setPostTitleLoading = true;
                draft.setPostTitleDone = false;
                draft.setPostTitleError = null;
                break;
            case SET_POST_TITLE_SUCCESS:
                draft.singlePost.title = action.data.title;
                draft.setPostTitleDone = true;
                draft.setPostTitleLoading = false;
                break;
            case SET_POST_TITLE_FAILURE:
                draft.setPostTitleLoading = false;
                draft.setPostTitleError = action.error;
                break;
            case SET_POST_TEXT_REQUEST:
                draft.setPostTextLoading = true;
                draft.setPostTextDone = false;
                draft.setPostTextError = null;
                break;
            case SET_POST_TEXT_SUCCESS:
                draft.singlePost.content = action.data.content;
                draft.setPostTextDone = true;
                draft.setPostTextLoading = false;
                break;
            case SET_POST_TEXT_FAILURE:
                draft.setPostTextLoading = false;
                draft.setPostTextError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS:
                draft.singlePost.Comments.unshift(action.data);
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
                draft.loadPostsLoading = false;
                draft.mainPosts = [];
            case SET_COUPANG_COOKIE:
                draft.coupangCookie = action.data || null;
            case UPLOAD_IMAGES_REQUEST:
                draft.uploadImagesLoading = true;
                draft.uploadImagesDone = false;
                draft.uploadImagesError = null;
                break;
            case UPLOAD_IMAGES_SUCCESS:
                draft.imagePaths = draft.imagePaths.concat(action.data);
                draft.uploadImagesDone = true;
                draft.uploadImagesLoading = false;
                break;
            case UPLOAD_IMAGES_FAILURE:
                draft.uploadImagesLoading = false;
                draft.uploadImagesError = action.error;
                break;
            case UPLOAD_THUMBNAIL_REQUEST:
                draft.uploadThumbnailLoading = true;
                draft.uploadThumbnailDone = false;
                draft.uploadThumbnailError = null;
                break;
            case UPLOAD_THUMBNAIL_SUCCESS:
                draft.thumbnailPath = draft.thumbnailPath.concat(action.data);
                draft.uploadThumbnailDone = true;
                draft.uploadThumbnailLoading = false;
                break;
            case UPLOAD_THUMBNAIL_FAILURE:
                draft.uploadThumbnailLoading = false;
                draft.uploadThumbnailError = action.error;
                break;
            case REMOVE_IMAGE:
                draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
                break;
            case REMOVE_THUMBNAIL:
                draft.thumbnailPath = draft.thumbnailPath.filter((v, i) => i !== action.data);
                break;
            default:
                break;
        };
    });
};

export default reducer;