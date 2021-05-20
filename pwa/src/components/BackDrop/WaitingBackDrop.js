import { Grid, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function Waiting() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <div>

            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <Grid container justify='space-between'>
                    <Grid item className={classes.progress}>
                        <CircularProgress />
                    </Grid>
                    <Grid item >
                        <Typography>
                            {message || "درحال ارسال اطلاعات"}
                        </Typography>
                    </Grid>
                </Grid>
            </Backdrop>
        </div>
    );
}
