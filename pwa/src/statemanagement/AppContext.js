import React, { createContext, useContext } from 'react';
import { StateProvider } from '../lib/store/appState';

const AppContext = createContext();


const reducer = (state, action) => {

    localStorage.setItem("theme", action.theme);
    return action;
}


export function AppWrapper({ children }) {
    let sharedState = {
        theme: localStorage.getItem("theme") || "light"
    }

    const [state, dispatch] = React.useReducer(reducer, sharedState);
    

    return (
        <StateProvider>
            <AppContext.Provider value={{ state, dispatch }} >
                {children}
            </AppContext.Provider>
        </StateProvider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}