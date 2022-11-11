import { Events } from "../../app/events";
import { omit } from "lodash";

export const dispatcher = new Events();

export const appDispatcher = (store) => {
  return (next) => {
    return (action) => {
      dispatcher.dispatch(action.type, omit(action, ["type"]));
      return next(action);
    };
  };
};
