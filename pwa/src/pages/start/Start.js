import { Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import ButtonBobo from '../../components/Button/ButtonBobo';
import {Link} from 'react-router-dom';

const useStyle = makeStyles(theme => ({
    root: {
        height: '100vh'
    },
    body: {
        flex: .9
    },
    footer: {

    }
}))

export default function Start() {
    const classes = useStyle();
    return (
        <Container>
            <Grid container className={classes.root} direction='column'>
                <Grid className={classes.body} item></Grid>
                <Grid className={classes.footer} item>
                    <Grid container justify='space-around'>
                        <Grid item xs={5}>
                            <Link to="/login">
                                <ButtonBobo fullWidth>
                                    ورود
                                </ButtonBobo>
                            </Link>
                        </Grid>

                        <Grid item xs={5}>
                            <Link to="/signup">
                                <ButtonBobo fullWidth>
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