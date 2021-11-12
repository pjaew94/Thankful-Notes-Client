import { AuthActionType } from "../action-types";
import { IAuthAction, IAuthState } from "../types";




export const auth =(state: IAuthState, action:IAuthAction): IAuthState => {

    const {type, payload} = action

    switch (type) {
        case AuthActionType.REGISTER_SUCCESS:
        case AuthActionType.LOGIN_SUCCESS:
          localStorage.setItem("token", payload.token);
    
          return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false,
          };
        case AuthActionType.REGISTER_FAIL:
        case AuthActionType.AUTH_ERROR:
        case AuthActionType.LOGIN_FAIL:
        case AuthActionType.LOGOUT:
          localStorage.removeItem("token");
          return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
          };
        case AuthActionType.USER_LOADED:
          return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: payload,
          };
    
        default:
          return state;
      }
    }