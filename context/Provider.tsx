import React, { createContext, useReducer } from "react";
import authInitialState from "./initial-states/authInitialState";
import { auth } from "./reducers/auth";
import todaysMessageInitialState from "./initial-states/todaysMessage";
import { todaysMessage } from "./reducers/todaysMessage";
import {
  IAuthAction,
  IAuthState,
  ILanguageState,
  ITodaysMessageAction,
  ITodaysMessageState,
} from "./types";
import { language } from "./reducers/language";
import languageInitialState from "./initial-states/language";

interface IGlobalProvider {
  children: React.ReactNode;
}

interface ICreateContext {
  authState: IAuthState | null;
  messageState: ITodaysMessageState | null;
  languageState: ILanguageState;
  authDispatch: React.Dispatch<any>;
  messageDispatch: React.Dispatch<any>;
  languageDispatch: React.Dispatch<any>;
}

const initialState = {
  authState: null,
  messageState: null,
  languageState: {
    korean: false
  },
  authDispatch: () => null,
  messageDispatch: () => null,
  languageDispatch: () => null,
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

  return (
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
        languageState,
        messageState,
        messageDispatch,
        languageDispatch
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
