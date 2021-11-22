
import { NavbarActionType } from '../action-types';
import { INavState, INavAction } from './../types';


export const nav =(state: INavState, action:INavAction): INavState => {
    const {type, payload} = action

    switch(type){
        case(NavbarActionType.SHOW_NAV):
            return {
                ...state,
                show: true
            }
        case(NavbarActionType.HIDE_NAV):
            return{
                ...state,
                show: false
            }
        case(NavbarActionType.SET_VALUE):
        return {
            show: false,
            value: payload
        }
        default:
            return state;
    }
}