import React, { useState } from 'react';
import { MAppBar, Button, Container, Divider, Grid, makeStyles, Paper, Toolbar, Typography } from '@material-ui/core';
import AppBar from '../components/AppBar/AppBar';
import AppBottomNav from '../components/Navigation/AppBottomNav';
import { initialState, StateProvider, useStateValue } from '../lib/store/appState';
import mainReducer from '../lib/reducer';

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
        padding: '5rem 10px',
    }
}));

export default function BaseLayout(props) {
    const [{ ui }] = useStateValue();

    const classes = useStyles();

    return (

        <>
            {
                ui.appbar
            }
            <Container className={classes.appBackground}  >
                <Grid container justify='center'
                    spacing={1}>
                    <Grid item xs={12} md={7} just >
                        {props.children}
                    </Grid>
                    {/* <Paper className={UserManager.IsAuthenticated() ? classes.root : ""}> */}

                    {/* </Paper> */}

                </Grid>

            </Container>

            <AppBottomNav />
        </>
    )
}
