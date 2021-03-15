import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import InputRenderer from '../../lib/InputRenderer';
import { Container, Grid, InputAdornment } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { PropType } from '../../lib/proptypes';

const useStyles = makeStyles((theme) => ({
    toolBar: {
        direction: 'rtl'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function WhereToGo({ open, handleWindow }) {
    const classes = useStyles();

    const handleClickOpen = () => {

    };

    const handleClose = () => {
        handleWindow(false);
    };

    return (

        <div  >
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <Toolbar className={classes.toolBar}>
                    <IconButton edge="start" color="primary" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>

                </Toolbar>
                <Container>
                    <InputRenderer
                        InputProps={{
                            startAdornment: (
                                <InputAdornment  position="start">
                                    <LocationOnIcon color="disabled" />
                                </InputAdornment>
                            ),
                        }}
                        autocomplete="off" placeholder="کجا می‌روید؟" Type={PropType.Text}
                        Name="currentCity" fullWidth />
                </Container>

            </Dialog>
        </div>
    );
}
