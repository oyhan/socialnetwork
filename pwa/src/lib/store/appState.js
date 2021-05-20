import React, { createContext, useContext, useReducer } from 'react';
import AppBar from '../../components/AppBar/AppBar';
import mainReducer from '../reducer';

export const StateContext = createContext();
export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(mainReducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

// const isLoggedIn = () => {
//   if (localStorage) {
//     const user = localStorage.getItem("user");
//     if (user)
//       return JSON.parse(user);
//     return false;

//   }
//   return false;
// }
const getUser = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return user;
  }

  return {};
}

export const initialState = {
  ui: {
    appbar: <AppBar />
  },
  user:getUser(),
}