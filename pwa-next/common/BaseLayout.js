import React, { useEffect, useState } from 'react';
import { MAppBar, Button, Container, Divider, Grid, makeStyles, Paper, Toolbar, Typography } from '@material-ui/core';
import AppBar from '../components/AppBar/AppBar';
import AppBottomNav from '../components/Navigation/AppBottomNav';
import { initialState, StateProvider, useStateValue } from '../lib/store/appState';
import mainReducer from '../lib/reducer';
import { actions } from '../lib/reducer/actions';

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
        height: '100%',
        // padding: '5rem 10px',
        padding : 0,
        marginBottom : 100
    }
}));

export default function BaseLayout(props) {
    const [{ ui, user },dispatch] = useStateValue();
    
    const getUser = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        return user;
      }
    useEffect(() => {
        var user = getUser();
        document.body.dir="rtl";
        // dispatch({ type: actions.USER, payload: { ...user, isAuthenticated: true, location: "" } })
        
        
      }, [])
    const classes = useStyles();

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
                user  && <AppBottomNav />
            }
        </>
    )
}
