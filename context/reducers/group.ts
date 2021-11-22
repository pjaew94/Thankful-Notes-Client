import { GroupTypeActionType } from "../action-types";
import { IGroupState, IGroupAction } from "./../types";

export const group = (
  state: IGroupState,
  action: IGroupAction
): IGroupState => {
  const { type, payload } = action;

  switch (type) {
    case GroupTypeActionType.GET_BASIC_INFO:
      return {
        ...payload,
      };

    default:
      return state;
  }
};
