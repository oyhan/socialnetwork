import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import ButtonBobo from '../../components/Button/ButtonBobo';
import { Link } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    body: {
        flex: .98
    },
    logoHolder: {
        width: 90,
        border: '1px solid',
        height: 90,
        marginBottom: 117,
        borderRadius: '50%',
    },
    btn: {
        border: '1px solid',
        width: '48%',
        height: '44px',
        fontSize: '20px',
    },
    loginBtn: {
        marginLeft: '1%',
    },
    signupBtn: {
        marginRight: '1%',
    },
    footer: {
        marginBlockStart: "auto",
        marginBottom: "10px",
        height: 44,
        fontSize: 20
    },
    btnWrapper: {
        width: '160px',
    }
}))



export default function Start() {
    const classes = useStyle();
    return (
        <Container>
            <Grid container className={classes.root} direction='column'>
                <Grid className={classes.body} container>
                    <Grid container justify='center' alignItems='center'>
                        <Grid container justify='center' alignItems='center' className={classes.logoHolder}>
                            <Box color="purple" fontWeight="900">
                                logo
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className={classes.footer} item>
                    <Link to="/signup">
                        <ButtonBobo className={`${classes.btn} ${classes.signupBtn}`} fullWidth>
                            ثبت نام
                        </ButtonBobo>
                    </Link>
                    <Link to="/login">
                        <ButtonBobo className={`${classes.btn} ${classes.loginBtn}`} fullWidth>
                            ورود
                        </ButtonBobo>
                    </Link>
                    <Grid container justify='space-around'>
                        <Grid item className={classes.btnWrapper} >
                            <Link to="/login">
                                <ButtonBobo className={classes.btn} fullWidth>
                                    ورود
                                </ButtonBobo>
                            </Link>
                        </Grid>

                        <Grid item className={classes.btnWrapper} >
                            <Link to="/signup">
                                <ButtonBobo className={classes.btn} fullWidth>
                                    ثبت نام
                                </ButtonBobo>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}