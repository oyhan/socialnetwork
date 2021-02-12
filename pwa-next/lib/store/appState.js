import React, {createContext, useContext, useReducer} from 'react';
import AppBar from '../../components/AppBar/AppBar';

export const StateContext = createContext();
export const StateProvider = ({reducer, initialState, children}) =>(
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);



export const initialState = {
    ui:{
        appbar:  <AppBar/>
    }
}