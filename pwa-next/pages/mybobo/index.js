import React, { useEffect, useState } from 'react';
import { Typography, makeStyles, Grid, Button, IconButton, Fab } from '@material-ui/core';
import ProfileAppBar from '../../components/Profile/ProfileAppBar';
import { useStateValue } from '../../lib/store/appState';
import ButtonBobo from '../../components/Button/ButtonBobo';
import { Add } from '@material-ui/icons';
import Link from 'next/link'
import FullWidthTabs from '../../components/Navigation/Tab/FullWidthTab';
import AppBar from '../../components/AppBar/AppBar';
import { actions } from '../../lib/reducer/actions';
import httpClientBuilder from '../../lib/HttpClient';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LanguageIcon from '@material-ui/icons/Language';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import SpeedDials from '../../components/SpeedDial/SpeedDial';
import PostNewDialog from '../../components/Post/PostNew';
import UserPosts from '../../components/Profile/UserProfile/UserPosts';

const useStyle = makeStyles((theme) => ({
    text: {
        marginTop: 12
    },
    div: {
        margin: '20px 0'
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(8),
        right: theme.spacing(3),
    },
}))

export default function MyBobo(profileDto) {



    const [newPost, setNewPost] = useState(false);
    const [photo, setPhoto] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    
    const classes = useStyle()
    const { avatarURl, bio, city, favorites, noOfFollowers, noOfFollowings, noOfPosts, userName, website } = profileDto;


    const handleNewPost = (files) => {
        

        setPhoto(files);
        setNewPost(true);
    }

    useEffect(() => {

        dispatch({
            type: actions.USER,
            payload: { ...profileDto, avatarURl }
        })
    }, [])

    const tabs = ["فعالیت‌های شما", "علاقه‌مندی‌های شما", "عکس‌ها", "Reviews"]

    const InfoItem = ({ title, icon, item, user }) => {


        const getIcon = (item) => {
            switch (item) {
                case "city":
                    return (
                        <IconButton disableRipple>
                            <LocationOnIcon />
                        </IconButton>
                    )
                case "bio":
                    return (
                        <IconButton disableRipple>
                            <InfoIcon />
                        </IconButton>

                    )
                case "favorites":
                    return (
                        <IconButton disableRipple>
                            <FavoriteIcon />

                        </IconButton>)

                case "website":
                    return (
                        <IconButton disableRipple>
                            <LanguageIcon />
                        </IconButton>)



            }
        }

        return (

            <Grid container spacing={1} direction='row'>
                {
                    user[item] ?
                        getIcon(item) :
                        <Link href="/mybobo/editprofile" >


                            <IconButton disableRipple>
                                <Add color='inherit' />
                            </IconButton>

                        </Link>
                }

                <Typography variant="caption" className={classes.text}>
                    {user[item] || title}
                </Typography>
            </Grid>
        )
    }



    return <>
        <ProfileAppBar profileDto={profileDto} />
        <Link href="/mybobo/editprofile" >
            <ButtonBobo color="primary" fullWidth>
                ویرایش پروفایل
            </ButtonBobo>
        </Link>

        <Grid className={classes.div} container direction='row' justify='space-around' >
            <Grid item direction='column'>
                <Typography >
                    دنبال شوندگان
                </Typography>
                <Link href={`/${user.userName}/followings`}>
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

        <Grid container>
            <InfoItem title="شهر فعلی خود را اضافه کنید" item="city" user={user} />
            <InfoItem title="علاقه‌مندی خود را اضافه کنید" item="favorites" user={user} />
            <InfoItem title="یک وبسایت اضافه کنید" item="website" user={user} />
            <InfoItem title="درباره خود جزئیاتی بنویسید" item="bio" user={user} />
        </Grid>

        <SpeedDials newPostClickHandler={handleNewPost} />
        <PostNewDialog open={newPost} handleWindow={setNewPost} photos={photo} />

        <FullWidthTabs tabs={tabs} tabsContent={[<UserPosts userName={userName} />, "favorites", "photos", "reviews"]} />
    </>
}

export async function getServerSideProps(context) {

    var httpClient = httpClientBuilder(context);
    var result = await httpClient.Get(`http://localhost:12089/profile/me`);



    return {
        props: result.response
    }


}
