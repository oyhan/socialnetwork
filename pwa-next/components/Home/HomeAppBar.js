import React, { useState } from 'react';
import MAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Chip, Fade, Slide, useScrollTrigger, Zoom } from '@material-ui/core';
import HeaderTopChip from '../Header/HeaderTopChip';
import HeaderLowerChip from '../Header/HeaderLowerChip';
import WhereToGo from './WhereToGo';
import { useScrollData } from 'scroll-data-hook';
import SearchBobo from './SearchBobo';
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
        display :'flex',
        flexDirection : 'column'
    },
    searchIcon :{
        position : 'fixed',
        top :10,
        left :10,
        zIndex :10,
    }

}));


export default function HomeAppBar(props) {
    const [open, setOpen] = useState();
    const handleClick = () => {
        setOpen(true);
    }
    const [openSeachBobo, setOpenSeachBobo] = useState(false);
    const classes = useStyles();
    var { position, direction } = useScrollData();


    const theme = useTheme();

    const calcToolbarStyle = () => {
        var style = {
            backgroundImage: `url(/home/header/bg.jpg)`,
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
            style.backgroundImage = `url(/home/header/bg.jpg)`;
        } else {
            style.height = 70;
            style.backgroundImage = 'unset';

        }

        return style;
    }

    const handleOpenSearchBobo = ()=>{
        setOpenSeachBobo(true);
    }

    return (
        <div className={classes.root}>
            {/* <HideOnScroll {...props}> */}

            <MAppBar elevation={0} position="fixed">
                <IconButton onClick={handleOpenSearchBobo} className={classes.searchIcon} aria-label="search" edge='start' color="inherit">
                    <SearchIcon />
                </IconButton>
                <Toolbar style={calcToolbarStyle()}>
                    <div className={classes.btnHolder}>
                        <HeaderTopChip handleClick={handleClick} title="کجا می‌روید؟" />
                        <HeaderLowerChip handleClick={handleClick} title="ببین نزدیکت چیه" />
                    </div>
                </Toolbar>

                <WhereToGo open={open} handleWindow={setOpen} />
                <SearchBobo open={openSeachBobo} handleWindow={setOpenSeachBobo} />
            </MAppBar>
            {/* </HideOnScroll> */}

            <div className={classes.offset} />
        </div>
    );
}
