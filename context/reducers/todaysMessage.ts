import { MessageActionType } from "../action-types";
import { ITodaysMessageAction, ITodaysMessageState } from "../types";

export const todaysMessage = (
  state: ITodaysMessageState,
  action: ITodaysMessageAction
):ITodaysMessageState => {
  const { type, payload } = action;
  switch (type) {
    case MessageActionType.GET_MESSAGE_SUCCESS:
      return {
        ...state,
        loadedMessage: payload,
        loading: false,
      };
    case MessageActionType.GET_MESSAGE_FAIL:
      return {
        ...state,
        loadedMessage: null,
        loading: false,
      };
    default:
      return state;
  }
};
