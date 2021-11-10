import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk"
import reducers from "./reducers";

const middleware = [thunk];

export const store = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(...middleware))
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch