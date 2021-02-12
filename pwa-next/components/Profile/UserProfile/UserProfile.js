import React, { useEffect } from 'react';
import { Typography, makeStyles, Grid, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Link from 'next/link'
// import UserProfileAppBar from './UserProfileAppBar';
import { useStateValue } from '../../../lib/store/appState';
import FollowerButton from '../../Button/FollowerButton';
import UserProfileAvatar from './UserProfileAvatar';
import AppBar from '../../AppBar/AppBar';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LanguageIcon from '@material-ui/icons/Language';
import InfoIcon from '@material-ui/icons/Info';
import FullWidthTabs from '../../Navigation/Tab/FullWidthTab';
// import ProfileAvatar from '../ProfileAvatar';

const useStyle = makeStyles(() => ({
    text: {
        marginTop: 12
    },
    div: {
        margin: '20px 0'
    },
    followerBtn: {
        margin: '1.5em 0'
    }
}))

export default function UserProfile({ username }) {
    const [, dispatch] = useStateValue();
    const classes = useStyle()
    useEffect(() => {
        // dispatch(<UserProfileAppBar />);
        return () => {
            dispatch(<AppBar />);
        }
    }, [])

    return <>
        <UserProfileAvatar username={username} />

        <Grid container justify='center' className={classes.followerBtn}>
            <Link href="/mybobo/editprofile" >
                <FollowerButton />
            </Link>
        </Grid>

        <Grid className={classes.div} container direction='row' justify='space-around' >
            <Grid item direction='column'>
                <Typography>
                    دنبال شوندگان
                </Typography>
                <Typography align='center'>
                    1
                </Typography>
            </Grid>
            <Grid item direction='column'>
                <Typography>
                    دنبال کنندگان
                </Typography>
                <Typography align='center'>
                    1
                </Typography>
            </Grid>
            <Grid item direction='column' >
                <Typography>
                    پست
                </Typography>
                <Typography align='center'>
                    0
                </Typography>
            </Grid>
        </Grid>

        <Grid container>
            <Grid container direction='row'>
                <IconButton disableRipple color='inherit'>
                    <LocationOnIcon />
                </IconButton>
                <Typography className={classes.text}>
                    شهر،ایران
                </Typography>
            </Grid>
            <Grid container direction='row'>
                <IconButton disableRipple color='inherit'>
                    <FavoriteIcon />
                </IconButton>
                <Typography className={classes.text}>
                    علاقه‌مندی‌ها
                </Typography>
            </Grid>
            <Grid container direction='row'>
                <IconButton disableRipple color='inherit'>
                    <LanguageIcon />
                </IconButton>
                <Typography className={classes.text}>
                    وب‌سایت
                </Typography>
            </Grid>
            <Grid container direction='row'>
                <IconButton disableRipple color='inherit'>
                    <InfoIcon />
                </IconButton>
                <Typography variant='body1' className={classes.text}>
                    یک آدم شوخ و بی مزه
                </Typography>
            </Grid>
        </Grid>

        <FullWidthTabs/>
    </>
}