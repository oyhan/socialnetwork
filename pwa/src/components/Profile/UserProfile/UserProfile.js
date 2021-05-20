import React, { useEffect, useState } from 'react';
import { Typography, makeStyles, Grid, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import {Link} from 'react-router-dom';

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
import { BrowserHttpClient } from '../../../lib/BrowserHttpClient';
import FollowButton from '../../Button/FollowButton';
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
    const { noOfFollowings, noOfFollowers, noOfPosts, userName, avatarURl, favorites, website, bio, city, id, isOwner, isFollowing } = user;
    const [following, setFollowing] = useState(isFollowing);


    const handleUnFollow = () => {
        BrowserHttpClient.Post(`/user/unfollow/${userName}`).then(() => {
            setFollowing(false);
        })
    }
    const handleFollow = () => {
        BrowserHttpClient.Post(`/user/follow/${userName}`).then(() => {
            setFollowing(true);
        })
    }

    return <>
        <UserProfileAppBar />
        <UserProfileAvatar {...user} />
        <Grid container justify='center' className={classes.followerBtn}>
            {following ? <FollowerButton onClick={handleUnFollow} /> :
                <FollowButton onClick={handleFollow} />
            }

        </Grid>
        <Grid className={classes.div} container direction='row' justify='space-around' >
            <Grid item direction='column'>
                <Typography>
                    دنبال شوندگان
                </Typography>
                <Link to={`/${user.userName}/followings`}>
                    <Typography align='center'>
                        {noOfFollowings}
                    </Typography>
                </Link>
            </Grid>
            <Grid item direction='column'>
                <Typography>
                    دنبال کنندگان
                </Typography>
                <Link href={`/${user.userName}/followers`}>
                    <Typography align='center'>
                        {noOfFollowers}
                    </Typography>
                </Link>
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
        <Grid spacing={1} className={classes.div} container direction='row' justify='space-around'>
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
                    {bio}
                </Typography>
            </Grid>
        </Grid>
        <FullWidthTabs tabs={["فعالیت", "عکس"]} tabsContent={[
            <UserPosts userName={userName} />
        ]} />
    </>
}