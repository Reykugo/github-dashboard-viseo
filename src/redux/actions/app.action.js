import { SET_LANGUAGE } from '../../utils/CONST';

export function setLanguage(language) {
    return {
        type: SET_LANGUAGE,
        language
    }
}