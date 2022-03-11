import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';
import category from './category';
import url from './url';

const rootReducer = (state, action) => {
    switch (action.type) {
        case HYDRATE:
            return action.payload;
        default: {
            const combineReducer = combineReducers({
                user,
                post,
                category,
                url,
            });
            return combineReducer(state, action);
        }
    }
};

export default rootReducer;