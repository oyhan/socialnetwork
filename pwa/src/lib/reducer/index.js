
import uiReducer from "./uiReducer";
import { userReducer } from "./userReducer";




const mainReducer = ({ ui , user }, action) => {

  // middleware goes here, i.e calling analytics service, etc.
  return {
    ui: uiReducer(ui, action),
    user : userReducer(user, action)
  };
};

export default mainReducer;