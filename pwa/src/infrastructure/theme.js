const AppTheme = {
    shape: {
        borderRadius: 0
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
        },


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
        tertiary: {
            main: '#80b7d0'
        }

    },
    direction: 'rtl',
    typography: {
        subtitle2: {
            fontSize: 9,
            fontWeight: 600
        },
        fontFamily: [
            'Homa',
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
};

export default AppTheme;