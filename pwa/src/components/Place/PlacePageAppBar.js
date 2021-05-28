import MAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useScrollData } from 'scroll-data-hook';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        background: `url(/home/header/bg.jpg)`,
        minHeight: 200,
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: theme.spacing(2),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    title: {
        flexGrow: 1,
        alignSelf: 'flex-end',
    },
    offset: {
        minHeight: 215
    },
    btnHolder: {
        justifySelf: 'center',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    searchIcon: {
        position: 'fixed',
        top: 10,
        left: 10,
        zIndex: 10,
    }

}));


export default function PlacePageAppBar(props) {
    const [open, setOpen] = useState();
    const handleClick = () => {
        setOpen(true);
    }
    const router = useHistory();
    const classes = useStyles();
    var { position, direction } = useScrollData();


    const theme = useTheme();

    const calcToolbarStyle = () => {
        var style = {
            backgroundImage: `url(/yazd.jpg)`,
            height: 200,
            alignItems: 'flex-start',
            paddingTop: theme.spacing(1),
            display: 'grid',
            flexDirection: 'column',
            paddingBottom: theme.spacing(2),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }

        if ((200 - position.y) >= 70) {
            style.height = 200 - position.y;
            style.backgroundImage = `url(/yazd.jpg)`;
        } else {
            style.height = 70;
            style.backgroundImage = 'unset';

        }

        return style;
    }
    const handleBack = () => {
        router.goBack();
    }

    return (
        <div className={classes.root}>
            {/* <HideOnScroll {...props}> */}

            <MAppBar elevation={0} position="fixed">
                <IconButton className={classes.searchIcon} onClick={handleBack} aria-label="search" edge='start' color="inherit">
                    <ArrowForwardIosIcon />
                </IconButton>
                {/* <HideOnScroll> */}
                    <Toolbar  style={calcToolbarStyle()} >



                    </Toolbar>
                {/* </HideOnScroll> */}

            </MAppBar>
            {/* </HideOnScroll> */}

            <div className={classes.offset} />
        </div>
    );
}
