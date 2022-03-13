import produce from '../util/produce';

export const initialState = {
    postCategories: [],
    setCategoryLoading: false,
    setCategoryDone: false,
    setCategoryError: false,
    addCategoryLoading: false,
    addCategoryDone: false,
    addCategoryError: false,
    loadCategoriesLoading: false,
    loadCategoriesDone: false,
    loadCategoriesError: false,
};

export const SET_CATEGORY_REQUEST = 'SET_CATEGORY_REQUEST';
export const SET_CATEGORY_SUCCESS = 'SET_CATEGORY_SUCCESS';
export const SET_CATEGORY_FAILURE = 'SET_CATEGORY_FAILURE';

export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';

export const LOAD_CATEGORIES_REQUEST = 'LOAD_CATEGORIES_REQUEST';
export const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS';
export const LOAD_CATEGORIES_FAILURE = 'LOAD_CATEGORIES_FAILURE';

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case SET_CATEGORY_REQUEST:
                draft.setCategoryLoading = true;
                draft.setCategoryDone = false;
                draft.setCategoryError = null;
                break;
            case SET_CATEGORY_SUCCESS:
                draft.postCategories.find((cat) => cat.label === action.data.label).enabled = action.data.enabled;
                draft.setCategoryDone = true;
                draft.setCategoryLoading = false;
                break;
            case SET_CATEGORY_FAILURE:
                draft.setCategoryLoading = false;
                draft.setCategoryError = action.error;
                break;
            case ADD_CATEGORY_REQUEST:
                draft.addCategoryLoading = true;
                draft.addCategoryDone = false;
                draft.addCategoryError = null;
                break;
            case ADD_CATEGORY_SUCCESS:
                draft.postCategories = action.data;
                draft.addCategoryDone = true;
                draft.addCategoryLoading = false;
                break;
            case ADD_CATEGORY_FAILURE:
                draft.addCategoryLoading = false;
                draft.addCategoryError = action.error;
                break;
            case LOAD_CATEGORIES_REQUEST:
                draft.loadCategoriesLoading = true;
                draft.loadCategoriesDone = false;
                draft.loadCategoriesError = null;
                break;
            case LOAD_CATEGORIES_SUCCESS:
                draft.postCategories = action.data;
                draft.loadCategoriesDone = true;
                draft.loadCategoriesLoading = false;
                break;
            case LOAD_CATEGORIES_FAILURE:
                draft.loadCategoriesLoading = false;
                draft.loadCategoriesError = action.error;
                break;
            default:
                break;
        }
    })
}

export default reducer;