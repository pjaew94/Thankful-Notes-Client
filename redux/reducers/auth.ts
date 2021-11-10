import { ActionType } from "../action-types";
import { IAuthAction, IAuthState } from "../types";



const initialState: IAuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default function authReducer(state = initialState, action: IAuthAction) {
  const { type, payload } = action;

  switch (type) {
    case ActionType.REGISTER_SUCCESS:
    case ActionType.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);

      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case ActionType.REGISTER_FAIL:
    case ActionType.AUTH_ERROR:
    case ActionType.LOGIN_FAIL:
    case ActionType.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case ActionType.USER_LOADED:
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
