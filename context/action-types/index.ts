export enum AuthActionType {
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAIL = 'LOGIN_FAIL',
    LOGOUT = 'LOGOUT',

    USER_LOADED = 'USER_LOADED',
    AUTH_ERROR = 'AUTH_ERROR',

    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    REGISTER_FAIL = 'REGISTER_FAIL',

    REMOVE_WARNING = 'REMOVE_WARNING'
}

export enum MessageActionType {
    GET_MESSAGE_SUCCESS = 'GET_MESSAGE_SUCCESS',
    GET_MESSAGE_FAIL = 'GET_MESSAGE_FAIL',
    CLEAR_MESSAGE = 'CLEAR_MESSAGE'
}

export enum LanguageActionType { 
    SET_ENGLISH = 'SET_ENGLISH',
    SET_KOREAN = 'SET_KOREAN',
}

export enum NavbarActionType {
    SHOW_NAV = 'SHOW_NAV',
    HIDE_NAV = 'HIDE_NAV',
    SET_VALUE = 'SET_VALUE'
}

export enum GroupTypeActionType {
    GET_BASIC_INFO = 'GET_BASIC_INFO',
    
}

export enum PostsTypeActionType {
    GET_USER_POSTS = 'GET_USER_POSTS',
    GET_GROUP_POSTS ='GET_GROUP_POSTS',
}

