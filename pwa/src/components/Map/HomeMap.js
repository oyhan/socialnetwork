import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Map from './Map';


const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 150,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        // position:'absolute'
    },
    wrapper:{
        width: '100vw',
        height: 150,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        position:'absolute',
        zIndex:1000,
        cursor : 'pointer'
    },
    title: {
        // marginBottom : theme.spacing(2),
    },
    container:{
        height : 150
    }
}))





export default function HomeMap({ items, title, points }) {


    const classes = useStyle();

    const onclick =  () => {

      
        router.push("/closest");

    }


    return (
        <>
            <Grid justify='space-between' direction='row' spacing={0}
                container className={classes.title} >
                <Typography component='h3'>
                    مکان‌های اطراف  را جستجو کنید
                 </Typography>

            </Grid>
            <Grid className={classes.container} container >
                <div className={classes.root} >
                    <Map points={points} />
                </div>
                <div onClick={onclick}  className={classes.wrapper}></div>
            </Grid>
        </>
    )

}