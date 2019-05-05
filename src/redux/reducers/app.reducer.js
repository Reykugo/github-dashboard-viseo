import { SET_LANGUAGE, SET_CURRENT_USER, SET_CURRENT_PROJECT } from '../../utils/CONST';

const intialState = {
    language: "EN",
    currentUser: null,
    currentProject: null,
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

        case SET_CURRENT_PROJECT: {
            return {
                ...state,
                currentProject: action.project
            }
        }
        default: return state;
    }
}