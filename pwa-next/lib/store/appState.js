import React, { createContext, useContext, useReducer } from 'react';
import AppBar from '../../components/AppBar/AppBar';

export const StateContext = createContext();
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
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
  if (typeof window !== 'undefined') {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log('user: ', user);
    return user;
  }
    return {};
}

export const initialState = {
  ui: {
    appbar: <AppBar />
  },
  user: getUser(),
}