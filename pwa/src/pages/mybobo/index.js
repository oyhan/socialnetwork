import { CircularProgress, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/Info';
import LanguageIcon from '@material-ui/icons/Language';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ButtonBobo from '../../components/Button/ButtonBobo';
import { resizeWithPica } from '../../components/ImageUploader/ImageUploader';
import FullWidthTabs from '../../components/Navigation/Tab/FullWidthTab';
import PostNewDialog from '../../components/Post/PostNew';
import ProfileAppBar from '../../components/Profile/ProfileAppBar';
import UserPosts from '../../components/Profile/UserProfile/UserPosts';
import SpeedDials from '../../components/SpeedDial/SpeedDial';
import useWebp from '../../lib/hooks/ImageCompress/useWebp';
import { actions } from '../../lib/reducer/actions';
import { useStateValue } from '../../lib/store/appState';
import Toast from '../../lib/toastHelper';
import { useHttpClient } from '../../lib/BrowserHttpClient';

const useStyle = makeStyles((theme) => ({
    text: {
        marginTop: 9,
        fontSize: 16,
        marginLeft: '-8px',
    },
    div: {
        margin: '20px 0'
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(8),
        right: theme.spacing(3),
    },
    addBtn: {
        "& svg": {
            fontSize: 24
        }
    }
}))

const resizePhotos = (files) => {
    return new Promise((resolve, reject) => {
        let i = 0;
        let selectedFiles = [];
        for (const file of files) {
            let image = new Image();
            image.src = window.URL.createObjectURL(file);
            image.onload = function () {
                resizeWithPica(image, 400).then((result) => {
                    fetch(result)
                        .then(res => res.blob())
                        .then(blob => {
                            selectedFiles = [...selectedFiles, blob];
                            i++;
                            if (i == files.length) {
                                resolve(selectedFiles);
                            }
                        })
                })
            }
        }
    }
    )
}
export default function MyBobo() {
    const [loading, profileDto, error] = useHttpClient("/profile/me", "Get", r => r.response);
    const [newPost, setNewPost] = useState(false);
    const [photo, setPhoto] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const [compressing, result] = useWebp(photo, 0.5);
    const classes = useStyle()

    const { avatarURl, bio, city, favorites, noOfFollowers, noOfFollowings, noOfPosts, userName, website } = profileDto || user;

    const handleNewPost = (files) => {
        setPhoto(files);
        setNewPost(true);
    }

    useEffect(() => {
        if (compressing) {
            Toast("درحال آماده سازی تصاویر");
        } else {
            toast.dismiss();
        }
    }, [compressing])

    useEffect(() => {
        if (profileDto) {
            dispatch({
                type: actions.USER,
                payload: { ...profileDto, avatarURl }
            })
        }
    }, [profileDto])

    const tabs = ["فعالیت‌های شما", "علاقه‌مندی‌های شما", "عکس‌ها", "نظرات"]

    const InfoItem = ({ title, icon, item, user }) => {
        const getIcon = (item) => {
            switch (item) {
                case "city":
                    return (
                        <IconButton disableRipple>
                            <LocationOnIcon htmlColor='black' />
                        </IconButton>
                    )
                case "bio":
                    return (
                        ""
                    )
                case "favorites":
                    return (
                        <IconButton disableRipple>
                            <FavoriteIcon htmlColor='black' />
                        </IconButton>)
                case "website":
                    return (
                        <IconButton disableRipple>
                            <LanguageIcon htmlColor='black' />
                        </IconButton>)
            }
        }
        return (
            <Grid container style={{ margin: '-8px 0' }} direction='row'>
                {
                    user[item] ?
                        getIcon(item) :
                        <Link to="/editprofile" >
                            <IconButton disableRipple className={classes.addBtn}>
                                <Add color='inherit' htmlColor='black' />
                            </IconButton>
                        </Link>
                }
                <Typography variant="caption" className={classes.text}>
                    {user[item] || <Link to="/editprofile" >{title}</Link>}
                </Typography>
            </Grid>
        )
    }
    if (!loading) {
        return <>
            {profileDto && <ProfileAppBar readonly profileDto={profileDto} />}
            <ButtonBobo component={Link} to="/editprofile" color="primary" fullWidth>
                ویرایش پروفایل
        </ButtonBobo>
            <Grid className={classes.div} container direction='row' justify='space-around' >
                <Grid item direction='column'>
                    <Typography >
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
                    <Link to={`/${user.userName}/followers`}>
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
                {
                    user.bio?  <Typography style={{ marginRight: 20 }} variant="caption" className={classes.text}>
                    {user.bio || "درباره خود جزئیاتی بنویسید"}
                </Typography> : 
                <InfoItem title="درباره خود جزئیاتی بنویسید" item="bio" user={user} />
                }
                {/* <Grid container direction='row'>
                    {
                        user.bio ? "" :
                            <Link to="/editprofile" >
                                <IconButton disableRipple>
                                    <Add color='inherit' htmlColor='black' />
                                </IconButton>
                            </Link>
                    }

                    <Typography style={{ marginRight: 20 }} variant="caption" className={classes.text}>
                        {user.bio || "درباره خود جزئیاتی بنویسید"}
                    </Typography>
                </Grid> */}
            </Grid>
            <SpeedDials newPostClickHandler={handleNewPost} />
            <PostNewDialog open={newPost} handleWindow={setNewPost} photos={result} />
            <FullWidthTabs tabs={tabs} tabsContent={[<UserPosts userName={userName} />, "favorites", "photos", "reviews"]} />
        </>
    }
    return (
        <CircularProgress />
    )
}