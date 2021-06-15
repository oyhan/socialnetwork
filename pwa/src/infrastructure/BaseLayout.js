import { Container, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import AppBottomNav from '../components/Navigation/AppBottomNav';
import { useStateValue } from '../lib/store/appState';

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
        // overflowY: 'hidden',
        // height: '100%',
        // padding: '5rem 10px',
        padding: '0 10px',
        marginBottom: 100,
        // background:'#e6e0e0'
        background: 'white',
    }
}));

const noBottomNavPaths = ["/nearme", "/login", "/signup", "/start", "/post"]
export default function BaseLayout(props) {

    const [state, dispatch] = useStateValue();


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
    const showBottomNav = () => {
        const loc = window.location.pathname;

        const anyMatch = noBottomNavPaths.some(r => {

            return loc.startsWith(r)
        });
        return !anyMatch;
    }

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
