import { Container } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    toolBar: {
        direction: 'rtl'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    closeBtn:{
        "& svg" :{
            fontSize : '2.0rem'
        },
        marginLeft: 'auto',
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchDialog({ open, handleWindow, toolbar, ...props }) {
    const classes = useStyles();

    const handleClickOpen = () => {

    };

    const handleClose = () => {
        handleWindow(false);
    };

    return (

        <div  >
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                {
                    toolbar ? toolbar :
                        <Toolbar className={classes.toolBar}>
                            <IconButton edge="end" color="primary"  className={classes.closeBtn} onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>

                        </Toolbar>
                }

                {/* <Container> */}
                    {
                        props.children
                    }
                {/* </Container> */}

            </Dialog>
        </div>
    );
}
