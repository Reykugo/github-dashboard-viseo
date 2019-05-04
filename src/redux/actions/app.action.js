import { SET_LANGUAGE, SET_CURRENT_USER } from '../../utils/CONST';

export function setLanguage(language) {
    return {
        type: SET_LANGUAGE,
        language
    }
}

export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    }
}