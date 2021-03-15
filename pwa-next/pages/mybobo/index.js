import React, { useEffect } from 'react';
import { Typography, makeStyles, Grid, Button, IconButton } from '@material-ui/core';
import ProfileAppBar from '../../components/Profile/ProfileAppBar';
import { useStateValue } from '../../lib/store/appState';
import ButtonBobo from '../../components/Button/ButtonBobo';
import { Add } from '@material-ui/icons';
import Link from 'next/link'
import FullWidthTabs from '../../components/Navigation/Tab/FullWidthTab';
import AppBar from '../../components/AppBar/AppBar';
import { actions } from '../../lib/reducer/actions';
import httpClientBuilder from '../../lib/HttpClient';

const useStyle = makeStyles((theme) => ({
    text: {
        marginTop: 12
    },
    div: {
        margin: '20px 0'
    }
}))

export default function MyBobo(profileDto) {

    const [, dispatch] = useStateValue();
    const classes = useStyle()
    const { avatarURl, biography, city, favorites, noOfFollowers, noOfFollowings, noOfPosts, userName, website } = profileDto;
    

    const tabs = ["فعالیت‌های شما", "علاقه‌مندی‌های شما", "عکس‌ها", "Reviews"]

    const InfoItem = ({ title, icon }) => (
        <Grid container spacing={1} direction='row'>
            <Link href="/mybobo/editprofile" >
                <IconButton disableRipple>
                    <Add color='inherit' />
                </IconButton>
            </Link>
            <Typography variant="caption" className={classes.text}>
                {title}
            </Typography>
        </Grid>
    )


    return <>
        <ProfileAppBar profileDto={profileDto} />
        <Link href="/mybobo/editprofile" >
            <ButtonBobo color="primary" fullWidth>
                ویرایش پروفایل
            </ButtonBobo>
        </Link>

        <Grid className={classes.div} container direction='row' justify='space-around' >
            <Grid item direction='column'>
                <Typography>
                    دنبال شوندگان
                </Typography>
                <Typography align='center'>
                    {noOfFollowings}
                </Typography>
            </Grid>
            <Grid item direction='column'>
                <Typography>
                    دنبال کنندگان
                </Typography>
                <Typography align='center'>
                    {noOfFollowers}
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

        <Grid container>
            <InfoItem title="شهر فعلی خود را اضافه کنید" />
            <InfoItem title="علاقه‌مندی خود را اضافه کنید" />
            <InfoItem title="یک وبسایت اضافه کنید" />
            <InfoItem title="درباره خود جزئیاتی بنویسید" />
        </Grid>

        <FullWidthTabs tabs={tabs} tabsContent={["activities", "favorites", "photos", "reviews"]} />
    </>
}

export async function getServerSideProps(context) {

    var httpClient = httpClientBuilder(context);
    var result = await httpClient.Get(`http://localhost:12089/profile/me`);


    return {
        props: result.response
    }


}
