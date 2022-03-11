import produce from '../util/produce';

export const initialState = {
    managingUrls: [],
    setUrlLoading: false,
    setUrlDone: false,
    setUrlError: false,
    addUrlLoading: false,
    addUrlDone: false,
    addUrlError: false,
    loadUrlsLoading: false,
    loadUrlsDone: false,
    loadUrlsError: false,
};

export const SET_URL_REQUEST = 'SET_URL_REQUEST';
export const SET_URL_SUCCESS = 'SET_URL_SUCCESS';
export const SET_URL_FAILURE = 'SET_URL_FAILURE';

export const ADD_URL_REQUEST = 'ADD_URL_REQUEST';
export const ADD_URL_SUCCESS = 'ADD_URL_SUCCESS';
export const ADD_URL_FAILURE = 'ADD_URL_FAILURE';

export const LOAD_URLS_REQUEST = 'LOAD_URLS_REQUEST';
export const LOAD_URLS_SUCCESS = 'LOAD_URLS_SUCCESS';
export const LOAD_URLS_FAILURE = 'LOAD_URLS_FAILURE';

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case SET_URL_REQUEST:
                draft.setUrlLoading = true;
                draft.setUrlDone = false;
                draft.setUrlError = null;
                break;
            case SET_URL_SUCCESS:
                draft.managingUrls.find((url) => url.name === action.data.name).link = action.data.link;
                draft.setUrlDone = true;
                draft.setUrlLoading = false;
                break;
            case SET_URL_FAILURE:
                draft.setUrlLoading = false;
                draft.setUrlError = action.error;
                break;
            case ADD_URL_REQUEST:
                draft.addUrlLoading = true;
                draft.addUrlDone = false;
                draft.addUrlError = null;
                break;
            case ADD_URL_SUCCESS:
                draft.managingUrls.unshift(action.data);
                draft.addUrlDone = true;
                draft.addUrlLoading = false;
                break;
            case ADD_URL_FAILURE:
                draft.addUrlLoading = false;
                draft.addUrlError = action.error;
                break;
            case LOAD_URLS_REQUEST:
                draft.loadUrlsLoading = true;
                draft.loadUrlsDone = false;
                draft.loadUrlsError = null;
                break;
            case LOAD_URLS_SUCCESS:
                draft.managingUrls = action.data;
                draft.loadUrlsDone = true;
                draft.loadUrlsLoading = false;
                break;
            case LOAD_URLS_FAILURE:
                draft.loadUrlsLoading = false;
                draft.loadUrlsError = action.error;
                break;
            default:
                break;
        }
    })
}

export default reducer;