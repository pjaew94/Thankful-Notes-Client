import React, { createContext, useReducer, useEffect } from "react";
import authInitialState from "./initial-states/authInitialState";
import { auth } from "./reducers/auth";
import todaysMessageInitialState from "./initial-states/todaysMessage";
import { todaysMessage } from "./reducers/todaysMessage";
import {
  IAuthAction,
  IAuthState,
  IGroupState,
  ILanguageState,
  INavState,
  IPostsState,
  ITodaysMessageAction,
  ITodaysMessageState,
} from "./types";
import { language } from "./reducers/language";
import languageInitialState from "./initial-states/language";
import navInitialState from "./initial-states/nav";
import { nav } from "./reducers/nav";
import { group } from "./reducers/group";
import groupInitialState from "./initial-states/group";
import { posts } from "./reducers/posts";
import postsInitialState from "./initial-states/posts";

interface IGlobalProvider {
  children: React.ReactNode;
}

interface ICreateContext {
  authState: IAuthState | null;
  messageState: ITodaysMessageState | null;
  languageState: ILanguageState;
  groupState: IGroupState;
  postsState: IPostsState;
  authDispatch: React.Dispatch<any>;
  messageDispatch: React.Dispatch<any>;
  languageDispatch: React.Dispatch<any>;
  navState: INavState;
  navDispatch: React.Dispatch<any>;
  groupDispatch: React.Dispatch<any>;
  postsDispatch: React.Dispatch<any>;
}

const initialState = {
  authState: null,
  messageState: null,
  languageState: {
    korean: false,
  },
  navState: {
    show: false,
    value: null,
  },
  groupState: {
    id: null,
    date_joined: null,
    group_name: null,
    members: null,
    unique_group_name: null,
  },
  postsState: {
    userPosts: [],
    groupPosts: [],
  },
  authDispatch: () => null,
  messageDispatch: () => null,
  languageDispatch: () => null,
  navDispatch: () => null,
  groupDispatch: () => null,
  postsDispatch: () => null,
};

export const GlobalContext = createContext<ICreateContext>(initialState);

export const GlobalProvider: React.FC<IGlobalProvider> = ({ children }) => {
  const [authState, authDispatch] = useReducer(auth, authInitialState);
  const [messageState, messageDispatch] = useReducer(
    todaysMessage,
    todaysMessageInitialState
  );
  const [languageState, languageDispatch] = useReducer(
    language,
    languageInitialState
  );
  const [navState, navDispatch] = useReducer(nav, navInitialState);
  const [groupState, groupDispatch] = useReducer(group, groupInitialState);
  const [postsState, postsDispatch] = useReducer(posts, postsInitialState);



  return (
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
        languageState,
        navState,
        groupState,
        messageState,
        postsState,
        messageDispatch,
        languageDispatch,
        navDispatch,
        groupDispatch,
        postsDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
