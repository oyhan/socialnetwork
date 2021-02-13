import React, { useEffect } from 'react';
import { Typography, makeStyles, Grid, Button, IconButton } from '@material-ui/core';
import ProfileAppBar from '../../components/Profile/ProfileAppBar';
import { useStateValue } from '../../lib/store/appState';
import ButtonBobo from '../../components/Button/ButtonBobo';
import { Add } from '@material-ui/icons';
import Link from 'next/link'
import FullWidthTabs from '../../components/Navigation/Tab/FullWidthTab';
import AppBar from '../../components/AppBar/AppBar';

const useStyle = makeStyles((theme) => ({
    text: {
        marginTop: 12
    },
    div: {
        margin: '20px 0'
    }
}))

export default function MyBobo() {
    const [, dispatch] = useStateValue();
    const classes = useStyle()
    useEffect(() => {
        dispatch(<ProfileAppBar />);
        return () => {

            dispatch(<AppBar />);
        }
    }, [])

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
            <InfoItem title="شهر فعلی خود را اضافه کنید"/>
            <InfoItem title="علاقه‌مندی خود را اضافه کنید"/>
            <InfoItem title="یک وبسایت اضافه کنید"/>
            <InfoItem title="درباره خود جزئیاتی بنویسید"/>
        </Grid>

        <FullWidthTabs tabs={tabs} tabsContent={["activities", "favorites", "photos", "reviews"]} />
    </>
}