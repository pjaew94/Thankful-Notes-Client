import { AuthActionType, LanguageActionType, MessageActionType } from "./action-types";

export interface IError {
  eng: string,
  kor: string
}

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
  } | null,
  error: IError | null
}

interface IRegisterLoginSuccess {
  type: AuthActionType.REGISTER_SUCCESS | AuthActionType.LOGIN_SUCCESS;
  payload: any;

}
interface IRegisterFailAuthErrorLoginFailLogout {
  type:
    | AuthActionType.REGISTER_FAIL
    | AuthActionType.AUTH_ERROR
    | AuthActionType.LOGIN_FAIL
    | AuthActionType.LOGOUT;
  payload: string;
}
interface IUserLoaded {
  type: AuthActionType.USER_LOADED;
  payload: IAuthState["user"];
}

interface IRemoveWarning {
  type: AuthActionType.REMOVE_WARNING
  payload: null
}

export type IAuthAction =
  | IRegisterLoginSuccess
  | IRegisterFailAuthErrorLoginFailLogout
  | IUserLoaded | IRemoveWarning

export interface IRegisterForm {
  username: string;
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  password: string;
  repeat_password: string;
}




// Message state types
interface IGetMessageSuccess {
  type: MessageActionType.GET_MESSAGE_SUCCESS;
  payload: ITodaysMessageState["loadedMessage"];
}
interface IGetMessageFail {
  type: MessageActionType.GET_MESSAGE_FAIL;
  payload: null;
}

export type ITodaysMessageAction = IGetMessageFail | IGetMessageSuccess;

export interface ITodaysMessageState {
  loadedMessage: {
    message: string | null;
    message_kor: string | null;
    book: string | null;
    book_kor: string | null;
    chapter_and_verse: string | null;
  } | null;
  loading: boolean;
}



// Language state types
interface ISetEnglish {
  type: LanguageActionType.SET_ENGLISH;
}

interface ISetKorean {
  type: LanguageActionType.SET_KOREAN;   
}

export type ILanguageAction = ISetEnglish | ISetKorean

export interface ILanguageState {
  korean: boolean
}