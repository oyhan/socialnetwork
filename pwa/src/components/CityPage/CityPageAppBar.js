import MAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useScrollData } from 'scroll-data-hook';
import HeaderTopChip from '../Header/HeaderTopChip';
import ScrollResizeHeader from '../Header/ScrollResizeHeader';
import SearchBobo from '../Home/SearchBobo';
import WhereToGo from '../Home/WhereToGo';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const useStyles = makeStyles((theme) => ({
    closeBtn: {
        background: 'white',
        '& span': {

            width: 10,
            height: 8,
        }

    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
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
        position: 'fixed',
        alignSelf: 'center',
        top: 56,
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
    }

}));

export default function CityPageAppBar({ photosCount, lastPhoto, id, name ,nearby}) {


    const router = useHistory();
    const [open, setOpen] = useState();
    const handleClick = () => {
        setOpen(true);
    }
    const [openSeachBobo, setOpenSeachBobo] = useState(false);
    const classes = useStyles();
    var { position, direction } = useScrollData();


    const theme = useTheme();

    const handleOpenSearchBobo = () => {
        setOpenSeachBobo(true);
    }

    const appBarStyle = {
        background:!lastPhoto ? `url(/yazd.jpg)`: `url(${lastPhoto})`,
        height: '60px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 150,
    };
    return (
        <div className={classes.root}>
            {/* <HideOnScroll {...props}> */}

            <MAppBar elevation={0} position="fixed" style={appBarStyle}>
                <IconButton onClick={handleOpenSearchBobo} className={classes.searchIcon} aria-label="search" edge='start' color="inherit">
                    <SearchIcon />
                </IconButton>
                <div className={classes.btnHolder}>
                    <IconButton size='small' className={classes.closeBtn} component={Link} to="/" aria-label="search" edge='start' color="inherit">
                        <CancelIcon htmlColor="black" fontSize='small' />
                    </IconButton>
                    <HeaderTopChip handleClick={handleClick} title={nearby? "نزدیک" :name} />
                </div>

                <div className={classes.bottomLeftButton}>
                    <IconButton component={Link} to={`/${name}/posts/${id}`} aria-label="search" edge='end' color="inherit">
                        <Typography variant='caption'>
                            {photosCount}
                        </Typography> &nbsp;<CameraAltIcon fontSize='small' />
                    </IconButton>
                </div>

                <WhereToGo open={open} handleWindow={setOpen} />
                <SearchBobo open={openSeachBobo} handleWindow={setOpenSeachBobo} />
            </MAppBar>
            <div className={classes.offset} />
        </div>
    );
}
