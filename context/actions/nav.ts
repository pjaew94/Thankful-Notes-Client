import { NavbarActionType } from "../action-types"
import { INavState } from "../types"


export const showNav = () => async(dispatch: CallableFunction) => {

    try {
        await dispatch({
            type: NavbarActionType.SHOW_NAV,
            payload: null
        })


        
    } catch (err) {
        
    }
}

export const hideNav = () => async(dispatch: CallableFunction) => {

    try {
        await dispatch({
            type: NavbarActionType.HIDE_NAV,
            payload: null
        })
        
    } catch (err) {
        
    }
}


export const setValueNav = (value: INavState['value']) => async(dispatch: CallableFunction) => {
    try {
        await dispatch({
            type: NavbarActionType.HIDE_NAV,
            payload: value
        })

    } catch (err) {
        
    }
}