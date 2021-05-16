import { Container, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import AppBottomNav from '../components/Navigation/AppBottomNav';
import { useStateValue } from '../lib/store/appState';
import Head from 'next/head'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '50px',
        marginTop: '50px'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBackground: {
        // position: 'fixed',
        // height: '100vh',
        width: '100%',
        overflowY: 'hidden',
        // height: '100%',
        // padding: '5rem 10px',
        padding: 0,
        // marginBottom: 100
    }
}));

export default function BaseLayout(props) {
    const [{ ui, user }, dispatch] = useStateValue();

    const getUser = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        return user;
    }
    useEffect(() => {
        var user = getUser();
        document.body.dir = "rtl";
        // dispatch({ type: actions.USER, payload: { ...user, isAuthenticated: true, location: "" } })


    }, [])
    const classes = useStyles();

    return (

        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="icons/apple-touch-icon.png?v=0" />
                <link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png?v=0" />
                <link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png?v=0" />
                <link rel="manifest" href="icons/site.webmanifest?v=0" />
                <link rel="mask-icon" href="icons/safari-pinned-tab.svg?v=0" color="#5bbad5" />
                <link rel="shortcut icon" href="icons/favicon.ico?v=0" />
                <meta name="apple-mobile-web-app-title" content="Bobo" />
                <meta name="application-name" content="Bobo" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="msapplication-config" content="icons/browserconfig.xml?v=0" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <Container className={classes.appBackground}  >
                <Grid container justify='center'>
                    <Grid item xs={12} md={7} >
                        {props.children}
                    </Grid>
                    {/* <Paper className={UserManager.IsAuthenticated() ? classes.root : ""}> */}

                    {/* </Paper> */}

                </Grid>

            </Container>

            {
                user && <AppBottomNav />
            }
           
        </>
    )
}
