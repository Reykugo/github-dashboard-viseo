import { SET_LANGUAGE, SET_CURRENT_USER } from '../../utils/CONST';

const intialState = {
    language: "EN",
    currentUser: null
}

export default (state = intialState, action = {}) => {
    switch (action.type) {
        case SET_LANGUAGE:
            return {
                ...state,
                language: action.language,
            }

        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.user
            }
        default: return state;
    }
}