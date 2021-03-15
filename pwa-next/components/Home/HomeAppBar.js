import React, { useState } from 'react';
import MAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Chip, Fade, Slide, useScrollTrigger, Zoom } from '@material-ui/core';
import HeaderTopChip from '../Header/HeaderTopChip';
import HeaderLowerChip from '../Header/HeaderLowerChip';
import WhereToGo from './WhereToGo';
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
        minHeight: 150
    },

}));
function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function HomeAppBar(props) {
    const [open,setOpen]= useState();
    const handleClick = () => {
        setOpen(true);
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <HideOnScroll {...props}>

                <MAppBar elevation={0} position="fixed">
                    <Toolbar className={classes.toolbar} >
                        <IconButton aria-label="search" edge='start' color="inherit">
                            <SearchIcon />
                        </IconButton>
                        <HeaderTopChip handleClick={handleClick} title="کجا می‌روید؟" />
                        <HeaderLowerChip handleClick={handleClick} title="ببین نزدیکت چیه" />
                    </Toolbar>
                    <WhereToGo open={open}  handleWindow={setOpen}/>
                </MAppBar>
            </HideOnScroll>

            <div className={classes.offset} />
        </div>
    );
}
