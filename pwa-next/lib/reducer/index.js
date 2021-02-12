
import uiReducer from "./uiReducer";




const mainReducer = ({ ui }, action) => {

  // middleware goes here, i.e calling analytics service, etc.
  return {
    ui: uiReducer(ui, action),
  };
};

export default mainReducer;