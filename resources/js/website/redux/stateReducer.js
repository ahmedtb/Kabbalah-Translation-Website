import { combineReducers } from 'redux';

const INITIAL_STATE = {
    user: null,
    allowedRoutes: []
};scrollBy

const stateReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'refresh-user':
            return {
                ...state,
                user: action.user,
            };
        default:
            return state
    }
};

export default combineReducers({
    state: stateReducer
});