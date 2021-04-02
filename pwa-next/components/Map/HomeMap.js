import { ButtonBase, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import Link from 'next/link'
import Map from './Map';
import { useRouter } from 'next/router'


const useStyle = makeStyles((theme) => ({
    root: {
        width: '100vw',
        height: 150,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    title: {
        // marginBottom : theme.spacing(2),
    }
}))





export default function HomeMap({ items, title, points }) {


    const classes = useStyle();

    const onclick = (route) => () => {


        router.push("/closestRestaurant");

    }


    return (
        <>
            <Grid justify='space-between' direction='row' spacing={0}
                container className={classes.title} >
                <Typography component='h3'>
                    مکان‌های اطراف  را جستجو کنید
                 </Typography>

            </Grid>
            <Grid onClick={onclick} container >
                <div className={classes.root} >
                    <Map points={points} />
                </div>
            </Grid>
        </>
    )

}