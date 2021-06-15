import MAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useScrollData } from 'scroll-data-hook';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import throttle from "lodash/throttle";
import { useThrottledOnScroll } from '../Navigation/Tab/ScrollSpyTabs';
const useStyles = (position) => makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        background: `url(/home/header/bg.jpg)`,
        minHeight: 150,
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
        minHeight: 160
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
    },
    bottomLeftButton: {
        position: 'fixed',
        top: 100,
        right: 10,
        zIndex: 10,
        display: position.y > 150 ? 'none' : 'block'
    }
}));


export default function PlacePageAppBar({ photos }) {
    const [open, setOpen] = useState();
    const handleClick = () => {
        setOpen(true);
    }
    const router = useHistory();
    var { position, direction } = useScrollData();

    const classes = useStyles(position)();


    const theme = useTheme();

    const calcToolbarStyle = (photo) => {
        const url = photos?.length > 0 ? `url(${photo.path})` : `url(/yazd.jpg)`

        var style = {
            backgroundImage: url,
            height: 150,
            alignItems: 'flex-start',
            paddingTop: theme.spacing(1),
            display: 'grid',
            flexDirection: 'column',
            paddingBottom: theme.spacing(2),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }

        if ((150 - position.y) >= 70) {
            style.height = 150 - position.y;
            style.backgroundImage = url;
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
                {/* <Toolbar style={calcToolbarStyle()} > */}
                <SwipeableViews enableMouseEvents>
                    {
                        photos.map(p => (
                            <div key={p.path} style={calcToolbarStyle(p)}></div>
                        ))
                    }

                </SwipeableViews>
                <div className={classes.bottomLeftButton}>
                    <IconButton component={Link} to={`/${"Asd"}/posts/${2}`} aria-label="search" edge='end' color="inherit">
                        <Typography variant='caption'>
                            {photos?.length}
                        </Typography> &nbsp;<CameraAltIcon fontSize='small' />
                    </IconButton>
                </div>

                {/* </Toolbar> */}

            </MAppBar>
            {/* </HideOnScroll> */}

            <div className={classes.offset} />
        </div>
    );
}
