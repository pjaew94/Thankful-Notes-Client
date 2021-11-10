import { ActionType } from "./action-types";

export interface IAuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    user: {
      id: string;
      group_id: string | null;
      is_in_group: boolean;
      first_name: string;
      last_name: string;
      age: number;
      email: string;
      date_joined: string;
    } | null;
  }
  
  interface IRegisterLoginSuccess {
    type: ActionType.REGISTER_SUCCESS | ActionType.LOGIN_SUCCESS;
    payload: any;
  }
  interface IRegisterFailAuthErrorLoginFailLogout {
    type: ActionType.REGISTER_FAIL | ActionType.AUTH_ERROR | ActionType.LOGIN_FAIL | ActionType.LOGOUT;
    payload: null;
  }
  interface IUserLoaded {
    type: ActionType.USER_LOADED;
    payload: IAuthState["user"];
  }
  
export type IAuthAction =
    | IRegisterLoginSuccess
    | IRegisterFailAuthErrorLoginFailLogout
    | IUserLoaded;


export interface IRegisterForm {
  username: string,
  first_name: string,
  last_name: string,
  age: number,
  email: string,
  password: string,
  repeat_password: string
}