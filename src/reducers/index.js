import { combineReducers } from "redux";
import listReucer from "./listReducer";

export default combineReducers({
  lists: listReucer,
});
