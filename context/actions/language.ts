import { LanguageActionType } from '../action-types';
import { ILanguageState } from './../types';
export const switchLanguage = (language: ILanguageState["language"]) => (dispatch: CallableFunction) => {
    if(language === "eng") {
        dispatch({
            type: LanguageActionType.SET_ENGLISH
        })
    } else {
        dispatch({
            type: LanguageActionType.SET_KOREAN
        })
    }
}