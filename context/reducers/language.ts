import { LanguageActionType } from "../action-types";
import { ILanguageAction } from "../types";
import { ILanguageState } from './../types';


export const language = (state: ILanguageState, action: ILanguageAction): ILanguageState => {
    const {type} = action

    switch(type){
        case LanguageActionType.SET_ENGLISH:
            return {
                korean: false
            }
        case LanguageActionType.SET_KOREAN:
            return {
                korean: true
            }
            default:
                return state
        
    }
}