import {
  AuthActionType,
  GroupTypeActionType,
  LanguageActionType,
  MessageActionType,
  NavbarActionType,
  PostsTypeActionType,
} from "./action-types";

export interface IError {
  eng: string;
  kor: string;
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
    current_day: number;
    username: string
  } | null;
  error: IError | null;
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
  type: AuthActionType.REMOVE_WARNING;
  payload: null;
}

export type IAuthAction =
  | IRegisterLoginSuccess
  | IRegisterFailAuthErrorLoginFailLogout
  | IUserLoaded
  | IRemoveWarning;

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

interface IClearMessage {
  type: MessageActionType.CLEAR_MESSAGE;
  payload: null;
}

export type ITodaysMessageAction =
  | IGetMessageFail
  | IGetMessageSuccess
  | IClearMessage;

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

export type ILanguageAction = ISetEnglish | ISetKorean;

export interface ILanguageState {
  korean: boolean;
}

// Navbar state types
interface ISetShowNav {
  type: NavbarActionType.SHOW_NAV;
  payload: null;
}

interface ISetHideNav {
  type: NavbarActionType.HIDE_NAV;
  payload: null;
}

interface ISetNavValue {
  type: NavbarActionType.SET_VALUE;
  payload: "Dashboard" | "Settings" | "Group";
}

export interface INavState {
  show: boolean;
  value: "Dashboard" | "Settings" | "Group" | null;
}

export type INavAction = ISetShowNav | ISetHideNav | ISetNavValue;

interface IGroupMember {
  username: string;
  first_name: string;
  last_name: string;
  current_day: number;
}

interface IGroupInfo {
  id: string | null;
  unique_group_name: string | null;
  group_name: string | null;
  date_joined: string | null;
  members: IGroupMember[] | null;
}

export interface IPost {
  id: string | null;
  username: string | null;
  first_name: string | null,
  last_name: string | null,
  group_id: string | null;
  message: string | null;
  message_kor: string | null;
  book: string | null;
  book_kor: string | null;
  chapter_and_verse: string | null;
  thought_on_verse1: string | null;
  thought_on_verse2: string | null;
  thought_on_verse3: string | null;
  thought_on_verse4: string | null;
  thought_on_verse5: string | null;
  show_thanks1: string | null;
  show_thanks2: string | null;
  show_thanks3: string | null;
  is_private: boolean | null;
  date_posted: string | null;
}

interface IGroupInfo {
  type: GroupTypeActionType.GET_BASIC_INFO;
  payload: {
    id: string | null;
    unique_group_name: string | null;
    group_name: string | null;
    date_joined: string | null;
    members: IGroupMember[] | null;
  };
}


export type IGroupAction =  IGroupInfo

export interface IGroupState {
  id: string | null;
  unique_group_name: string | null;
  group_name: string | null;
  date_joined: string | null;
  members: IGroupMember[] | null;
}


interface IGetUserPosts {
  type: PostsTypeActionType.GET_USER_POSTS,
  payload: IPost [],
}

interface IGetGroupPosts {
  type: PostsTypeActionType.GET_GROUP_POSTS,
  payload: IPost[]
}

export type  IPostsAction = IGetUserPosts | IGetGroupPosts

export interface IPostsState {
  userPosts: IPost[],
  groupPosts: IPost[]
}