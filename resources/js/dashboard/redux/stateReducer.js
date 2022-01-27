import { combineReducers } from 'redux';

const INITIAL_STATE = {
    admin: null,
    allowedRoutes: []
};scrollBy

const stateReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'refresh-admin':
            return {
                ...state,
                admin: action.admin,
            };
        default:
            return state
    }
};

export default combineReducers({
    state: stateReducer
});