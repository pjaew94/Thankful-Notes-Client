import { AuthActionType } from "../action-types";
import { IAuthAction, IAuthState } from "../types";




export const auth =(state: IAuthState, action:IAuthAction): IAuthState => {

    const {type, payload} = action

    switch (type) {
        case AuthActionType.REGISTER_SUCCESS:
        case AuthActionType.LOGIN_SUCCESS:
          localStorage.setItem("token", payload);
    
          return {
            ...state,
            token: payload,
            isAuthenticated: true,
            loading: false,
            error: null
          };
        case AuthActionType.REGISTER_FAIL:
        case AuthActionType.AUTH_ERROR:
        case AuthActionType.LOGIN_FAIL:
        case AuthActionType.LOGOUT:
          localStorage.removeItem("token");
          console.log(payload)
          return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: payload
          };
        case AuthActionType.USER_LOADED:
          return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: payload,
            error: null
          };
        case AuthActionType.REMOVE_WARNING:
          return {
            ...state,
            error: null
          }
    
        default:
          return state;
      }
    }