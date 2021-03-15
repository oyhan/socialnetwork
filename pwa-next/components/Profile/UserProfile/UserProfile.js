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
import UserPosts from './UserPosts';
import UserProfileAppBar from './UserProfileAppBar';
import { actions } from '../../../lib/reducer/actions';
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

export default function UserProfile({ user }) {
    
    const [, dispatch] = useStateValue();
    const classes = useStyle()
    useEffect(() => {
        dispatch({ type: actions.APPBAR, payload: <UserProfileAppBar /> });
        return () => {
            dispatch({ type: actions.APPBAR, payload: <AppBar /> });
        }
    }, [])
    const {noOfFollowings,noOfFollowers,noOfPosts,userName,avatarURl,favorites,website,biography,city} = user;
    
    
    


    return <>
        <UserProfileAvatar username={userName} />

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
                    {noOfFollowers}
                </Typography>
            </Grid>
            <Grid item direction='column'>
                <Typography>
                    دنبال کنندگان
                </Typography>
                <Typography align='center'>
                    {noOfFollowings}
                </Typography>
            </Grid>
            <Grid item direction='column' >
                <Typography>
                    پست
                </Typography>
                <Typography align='center'>
                   {noOfPosts}
                </Typography>
            </Grid>
        </Grid>

        <Grid spacing={1} container className={classes.div}>
            <Grid container spacing={1} direction='row'>
                <IconButton size='small' disableRipple color='inherit'>
                    <LocationOnIcon />
                </IconButton>
                <Typography variant='caption' className={classes.text}>
                    {city}
                </Typography>
            </Grid>
            <Grid container spacing={1} direction='row'>
                <IconButton size='small' disableRipple color='inherit'>
                    <FavoriteIcon />
                </IconButton>
                <Typography variant='caption' className={classes.text}>
                    {favorites}
                </Typography>
            </Grid>
            <Grid container spacing={1} direction='row'>
                <IconButton size='small' disableRipple color='inherit'>
                    <LanguageIcon />
                </IconButton>
                <Typography variant='caption' className={classes.text}>
                    {website}
                </Typography>
            </Grid>
            <Grid container direction='row'>

                <Typography variant='caption' className={classes.text}>
                   {biography}
                </Typography>
            </Grid>
        </Grid>

        <FullWidthTabs tabs={["فعالیت", "عکس"]} tabsContent={[
            <UserPosts />
        ]} />
    </>
}