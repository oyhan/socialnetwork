import { Container, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import AppBottomNav from '../components/Navigation/AppBottomNav';
import { useStateValue } from '../lib/store/appState';

const useStyles = (showBottomNav) => makeStyles((theme) => ({
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
        // overflowY: 'hidden',
        // height: '100%',
        // padding: '5rem 10px',
        padding: '0px',
        marginBottom: showBottomNav? 50 : 0,
        // background:'#e6e0e0'
        background: 'white',
    }
}));

const noBottomNavPaths = ["/nearme", "/login", "/signup", "/start", "/post"]
export default function BaseLayout(props) {
    const [state, dispatch] = useStateValue();
    const location = useLocation()

    
    const [showBottom, setShowBottom] = useState(true);

    const getUser = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        return user;
    }

    const showBottomNav = () => {
        const loc = window.location.pathname;

        const anyMatch = noBottomNavPaths.some(r => {

            return loc.startsWith(r)
        });
        return !anyMatch;
    }
    useEffect(() => {
        showBottomNav() ? setShowBottom(true) : setShowBottom(false);

    }, [location])
    const classes = useStyles(showBottomNav())();


    return (

        <>
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
                showBottomNav() && <AppBottomNav />

            }

        </>
    )
}
