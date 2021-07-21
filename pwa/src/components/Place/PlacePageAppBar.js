import { Typography } from '@material-ui/core';
import MAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import ReplyIcon from '@material-ui/icons/Reply';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { useScrollData } from 'scroll-data-hook';
const headerHeight = 190;

const useStyles = (position) => makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        background: `url(/home/header/bg.jpg)`,
        minHeight: headerHeight,
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
        minHeight: 180
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
        top: 140,
        right: 10,
        zIndex: 10,
        display: position.y > headerHeight ? 'none' : 'block'
    },
    sharebtn: {
        position: 'fixed',
        top: 10,
        right: 10,
        zIndex: 10,
    }
}));

export default function PlacePageAppBar({ photos, place }) {
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
            height: headerHeight,
            maxHeight:headerHeight,
            alignItems: 'flex-start',
            paddingTop: theme.spacing(1),
            display: 'grid',
            flexDirection: 'column',
            paddingBottom: theme.spacing(2),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }

        if ((headerHeight - position.y) >= 70) {
            style.height = headerHeight - position.y;
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

    const sharePlace = async () => {
        const shareData = {
            title: `رستوران ${place.name} را ببینید`,
            // text: text,
            url: `/place/${place.id}`,
        }
        try {
            await navigator.share(shareData)
        } catch (err) {

        }
    }

    return (
        <div className={classes.root}>
            {/* <HideOnScroll {...props}> */}

            <MAppBar elevation={0} position="fixed">
                <IconButton className={classes.searchIcon} onClick={handleBack} aria-label="search" edge='start' color="inherit">
                    <ArrowForwardIosIcon />
                </IconButton>

                <IconButton onClick={sharePlace} className={classes.sharebtn} aria-label="share" color="inherit">
                    <ReplyIcon />
                </IconButton>
                {/* <Toolbar style={calcToolbarStyle()} > */}
                <SwipeableViews enableMouseEvents>
                    {
                        photos.length ==0 ? 
                        
                        <div style={calcToolbarStyle({})}></div> :

                        photos.map(p => (
                            <div key={p.path} style={calcToolbarStyle(p)}></div>
                        ))
                    }

                </SwipeableViews>
                <div className={classes.bottomLeftButton}>
                    <IconButton  aria-label="search" edge='end' color="inherit">
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
