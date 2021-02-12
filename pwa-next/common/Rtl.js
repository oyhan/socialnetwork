import React from 'react'
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { makeStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import '../styles/rtl.css'
// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
export const theme = createMuiTheme({
    shape: {
        borderRadius : 0
    },
    // mixins :{
    //     toolbar : {
    //         height : 250
    //     }
    // } ,
    overrides: {
        MuiCssBaseline: {
          '@global': {
            '*::-webkit-scrollbar': {
              width: '0.4em'
            },
            '*::-webkit-scrollbar-track': {
              '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '*::-webkit-scrollbar-thumb': {
              backgroundColor: 'orange',
              outline: '1px solid slategrey'
            }
          }
        }
      },
    palette: {
        text: {
            
            // primary: '#ffffff',
            // secondary :'#ffffff'
        },
        primary: {
            dark: '#4f001d',
            light: '#b3506e',
            main: '#802143',
        },
        secondary: {
            dark: '#ab4680',
            light: '#ffa7e1',
            main: '#df76af'
        },
        tertiary :{
            main : '#80b7d0'
        }

    },
    direction: 'rtl',
    typography: {
        fontFamily: [
            'IranYekan',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(',')
    }
});

export default function RTL(props) {



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
