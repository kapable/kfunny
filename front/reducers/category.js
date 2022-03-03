import produce from '../util/produce';
import shortId from 'shortid';

export const initialState = {
    postCategories: [{
        id:shortId.generate(),
        label: "최신",
        enabled: true,
    }, {
        id:shortId.generate(),
        label: "경제",
        enabled: true,
    }, {
        id:shortId.generate(),
        label: "정치",
        enabled: true,
    }, {
        id:shortId.generate(),
        label: "연예",
        enabled: true,
    }, {
        id:shortId.generate(),
        label: "사회",
        enabled: true,
    },{
        id:shortId.generate(),
        label: "문화",
        enabled: true,
    },{
        id:shortId.generate(),
        label: "역사",
        enabled: false,
    }],
    setCategoryLoading: false,
    setCategoryDone: false,
    setCategoryError: false,
    addCategoryLoading: false,
    addCategoryDone: false,
    addCategoryError: false,
};

export const SET_CATEGORY_REQUEST = 'SET_CATEGORY_REQUEST';
export const SET_CATEGORY_SUCCESS = 'SET_CATEGORY_SUCCESS';
export const SET_CATEGORY_FAILURE = 'SET_CATEGORY_FAILURE';

export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case SET_CATEGORY_REQUEST:
                draft.setCategoryLoading = true;
                draft.setCategoryDone = false;
                draft.setCategoryError = null;
                break;
            case SET_CATEGORY_SUCCESS:
                draft.postCategories.find((cat) => cat.label === action.data.v).enabled = action.data.checked;
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
                draft.postCategories = draft.postCategories.concat([{
                    id:shortId.generate(),
                    label: action.data,
                    enabled: false,
                }]);
                draft.addCategoryDone = true;
                draft.addCategoryLoading = false;
                break;
            case ADD_CATEGORY_FAILURE:
                draft.addCategoryLoading = false;
                draft.addCategoryError = action.error;
                break;
            default:
                break;
        }
    })
}

export default reducer;