
const uiReducer = (state, action) => {
  switch (action.type) {
    case 'APPBAR':
      return {
        appbar: action.payload
      }
    default:
      return state;
  }

};
export default uiReducer;
