import React, { useEffect, useState } from 'react'
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset, useTheme } from '@material-ui/core/styles';
import { makeStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { faIR } from '@material-ui/core/locale';
import { useAppContext } from '../statemanagement/AppContext';
import AppTheme from './theme';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export var globaltheme;

export var changeAppTheme;


export default function RTL(props) {
    const {state} = useAppContext();
    
    
    const [theme, setTheme] = useState(createMuiTheme(AppTheme, faIR));

    useEffect(()=>{
        AppTheme.palette.type  = state.theme;
        setTheme(createMuiTheme(AppTheme, faIR))
    },[state])
   
    return (
        <StylesProvider jss={jss}>
            <MuiThemeProvider theme={theme}>
                <div dir="rtl">
                    {props.children}
                </div>
            </MuiThemeProvider>
        </StylesProvider>
    );
}