import produce from '../util/produce';

export const initialState = {
    mainArticles: [],
    singleArticle: {
    },
    coupangCookie: false || null,
    hasMoreArticles: true,
    loadArticlesLoading: false,
    loadArticlesDone: false,
    loadArticlesError: false,
    addArticleLoading: false,
    addArticleDone: false,
    addArticleError: false,
    removeArticleLoading: false,
    removeArticleDone: false,
    removeArticleError: false,
    editArticleLoading: false,
    editArticleDone: false,
    editArticleError: false,
    loadArticleLoading: false,
    loadArticleDone: false,
    loadArticleError: false,
    uploadArticleImageLoading: false,
    uploadArticleImageDone: false,
    uploadArticleImageError: false,
};

export const LOAD_ARTICLES_REQUEST = 'LOAD_ARTICLES_REQUEST';
export const LOAD_ARTICLES_SUCCESS = 'LOAD_ARTICLES_SUCCESS';
export const LOAD_ARTICLES_FAILURE = 'LOAD_ARTICLES_FAILURE';

export const LOAD_ARTICLE_REQUEST = 'LOAD_ARTICLE_REQUEST';
export const LOAD_ARTICLE_SUCCESS = 'LOAD_ARTICLE_SUCCESS';
export const LOAD_ARTICLE_FAILURE = 'LOAD_ARTICLE_FAILURE';

export const ADD_ARTICLE_REQUEST = 'ADD_ARTICLE_REQUEST';
export const ADD_ARTICLE_SUCCESS = 'ADD_ARTICLE_SUCCESS';
export const ADD_ARTICLE_FAILURE = 'ADD_ARTICLE_FAILURE';

export const REMOVE_ARTICLE_REQUEST = 'REMOVE_ARTICLE_REQUEST';
export const REMOVE_ARTICLE_SUCCESS = 'REMOVE_ARTICLE_SUCCESS';
export const REMOVE_ARTICLE_FAILURE = 'REMOVE_ARTICLE_FAILURE';

export const EDIT_ARTICLE_REQUEST = 'EDIT_ARTICLE_REQUEST';
export const EDIT_ARTICLE_SUCCESS = 'EDIT_ARTICLE_SUCCESS';
export const EDIT_ARTICLE_FAILURE = 'EDIT_ARTICLE_FAILURE';

export const UPLOAD_ARTICLE_IMAGE_REQUEST = 'UPLOAD_ARTICLE_IMAGE_REQUEST';
export const UPLOAD_ARTICLE_IMAGE_SUCCESS = 'UPLOAD_ARTICLE_IMAGE_SUCCESS';
export const UPLOAD_ARTICLE_IMAGE_FAILURE = 'UPLOAD_ARTICLE_IMAGE_FAILURE';

export const SET_COUPANG_COOKIE = 'SET_COUPANG_COOKIE';

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOAD_ARTICLES_REQUEST:
                draft.loadArticlesLoading = true;
                draft.loadArticlesDone = false;
                draft.loadArticlesError = null;
                break;
            case LOAD_ARTICLES_SUCCESS:
                draft.mainArticles = draft.mainArticles.concat(action.data.slice(0, 50));
                draft.loadArticlesDone = true;
                draft.loadArticlesLoading = false;
                draft.hasMorePosts = action.data.length === 51;
                break;
            case LOAD_ARTICLES_FAILURE:
                draft.loadArticlesLoading = false;
                draft.loadArticlesError = action.error;
                break;
            case LOAD_ARTICLE_REQUEST:
                draft.loadArticleLoading = true;
                draft.loadArticleDone = false;
                draft.loadArticleError = null;
                break;
            case LOAD_ARTICLE_SUCCESS:
                draft.singleArticle = action.data;
                draft.loadArticleDone = true;
                draft.loadArticleLoading = false;
                draft.hasMorePosts = action.data.length === 10;
                break;
            case LOAD_ARTICLE_FAILURE:
                draft.loadArticlesLoading = false;
                draft.loadArticlesError = action.error;
                break;
            case ADD_ARTICLE_REQUEST:
                draft.addArticleLoading = true;
                draft.addArticleDone = false;
                draft.addArticleError = null;
                break;
            case ADD_ARTICLE_SUCCESS:
                draft.mainArticles.unshift(action.data);
                draft.addArticleDone = true;
                draft.addArticleLoading = false;
                break;
            case ADD_ARTICLE_FAILURE:
                draft.addArticleLoading = false;
                draft.addArticleError = action.error;
                break;
            case REMOVE_ARTICLE_REQUEST:
                draft.removeArticleLoading = true;
                draft.removeArticleDone = false;
                draft.removeArticleError = null;
                break;
            case REMOVE_ARTICLE_SUCCESS:
                draft.mainArticles = draft.mainArticles.filter((v) => v.id !== action.data.ArticleId);
                draft.removeArticleDone = true;
                draft.removeArticleLoading = false;
                break;
            case REMOVE_ARTICLE_FAILURE:
                draft.removeArticleLoading = false;
                draft.removeArticleError = action.error;
                break;
            case EDIT_ARTICLE_REQUEST:
                draft.editArticleLoading = true;
                draft.editArticleDone = false;
                draft.editArticleError = null;
                break;
            case EDIT_ARTICLE_SUCCESS:
                draft.singleArticle = action.data;
                draft.editArticleDone = true;
                draft.editArticleLoading = false;
                break;
            case EDIT_ARTICLE_FAILURE:
                draft.editArticleLoading = false;
                draft.editArticleError = action.error;
                break;
            case SET_COUPANG_COOKIE:
                draft.coupangCookie = action.data || null;
            case UPLOAD_ARTICLE_IMAGE_REQUEST:
                draft.uploadArticleImageLoading = true;
                draft.uploadArticleImageDone = false;
                draft.uploadArticleImageError = null;
                break;
            case UPLOAD_ARTICLE_IMAGE_SUCCESS:
                draft.uploadArticleImageDone = true;
                draft.uploadArticleImageLoading = false;
                break;
            case UPLOAD_ARTICLE_IMAGE_FAILURE:
                draft.uploadArticleImageLoading = false;
                draft.uploadArticleImageError = action.error;
                break;
            default:
                break;
        };
    });
};

export default reducer;