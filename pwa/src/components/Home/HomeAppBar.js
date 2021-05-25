import MAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import { useScrollData } from 'scroll-data-hook';
import HeaderLowerChip from '../Header/HeaderLowerChip';
import HeaderTopChip from '../Header/HeaderTopChip';
import ScrollResizeHeader from '../Header/ScrollResizeHeader';
import SearchBobo from './SearchBobo';
import WhereToGo from './WhereToGo';

import {useHistory} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
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
        minHeight: 215
    },
    btnHolder: {
        marginTop: 40,
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
    appBar : {
        height: '60px',
        background: 'url(/home/header/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 150,
    }

}));


export default function HomeAppBar(props) {
    const router = useHistory();
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

    const handleOpenSearchBobo = () => {
        setOpenSeachBobo(true);
    }

    const goToWhatsNearMe = ()=>{
        router.push("/seewhatsaround");
    }
    return (
        <div className={classes.root}>
            {/* <HideOnScroll {...props}> */}

            <MAppBar elevation={0} position="fixed" className={classes.appBar}>
                <IconButton onClick={handleOpenSearchBobo} className={classes.searchIcon} aria-label="search" edge='start' color="inherit">
                    <SearchIcon />
                </IconButton>
                {/* <Toolbar style={calcToolbarStyle()}>
                    <div className={classes.btnHolder}>
                        <HeaderTopChip handleClick={handleClick} title="کجا می‌روید؟" />
                        <HeaderLowerChip handleClick={handleClick} title="ببین نزدیکت چیه" />
                    </div>
                </Toolbar> */}

                {/* <ScrollResizeHeader/> */}
                   
                
                <div className={classes.btnHolder}>
                        <HeaderTopChip handleClick={handleClick} title="کجا می‌روید؟" />
                        <HeaderLowerChip handleClick={goToWhatsNearMe} title="ببین نزدیکت چیه" />
                    </div>
                <WhereToGo open={open} handleWindow={setOpen} />
                <SearchBobo open={openSeachBobo} handleWindow={setOpenSeachBobo} />
            </MAppBar>
            {/* </HideOnScroll> */}

            <div className={classes.offset} />
        </div>
    );
}
