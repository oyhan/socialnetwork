import { Card, CardActions, CardContent, CardMedia, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import RoomIcon from '@material-ui/icons/Room';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { BrowserHttpClient } from '../../../lib/BrowserHttpClient';
import Rate from '../../Rate/Rate';
import HeartIcon from '../../Icons/HeartIcon';
const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        maxWidth: 150,
        minWidth: 130,
        height: 124
    },
    media: {
        height: 80,
        width: 130,
    },
    btn: {
        position: 'absolute',
        top: 8.88,
        right: 11.25,
        // background: '#ffffff7d',
        "&:hover": {
            // background :theme.palette.secondary.light
        }

    },
    ratesCount: {
        fontSize: 10,
        lineHeight: '18px',
        paddingLeft: 6,
    },
    
    distance: {
        fontSize: 8,
        marginRight: 0,
        lineHeight: 1.5,
    },
   
    placeTitle: {
        fontSize: 10,
        margin: '-3px 0px',
    },
    smalIcon: {
        fontSize: '.6rem'
    },
   
    placeIcon:{
        marginLeft :-1
    },
    rateContainer :{
        margin: '-2px 0',
    },
    specsContainer: {
        marginTop : 2
    }

}));
export default function SliderItem({ image, title, rate, ratesCount, distance, favorite, faveCallBack, id }) {
    const classes = useStyles();
    const [faved, setFaved] = useState(false);
    useEffect(() => {
        setFaved(favorite);

    }, [favorite])
    const handlFave = () => {

        if (faved) {
            BrowserHttpClient.Post(`/place/unfave/${id}`).then(result => {
                setFaved(false)
            }).catch(error => {
                alert(error);
            })
        } else {
            BrowserHttpClient.Post(`/place/fave/${id}`).then(result => {
                setFaved(true)
            }).catch(error => {
                alert(error);
            })
        }
    }

    return (

        <Card elevation={0} className={classes.root}>
            <Link to={`place/${id}`} >

                <CardMedia
                    className={classes.media}
                    image={image}
                    title=""
                />
            </Link>

            <Grid container className={classes.specsContainer}>
                <Grid container>
                    <Typography variant="caption" className={classes.placeTitle} component="h6">
                        {title}
                    </Typography>
                </Grid>

                <Grid  container direction='row'>
                    <Rate size='small' value={rate} />
                    <Typography className={classes.ratesCount} color='textSecondary'>
                       ({ratesCount})
                    </Typography>
                </Grid>
                <Grid container direction='row'>
                    <RoomIcon classes={{ fontSizeSmall: classes.smalIcon }} className={classes.placeIcon} fontSize="small" />
                    <Typography className={classes.distance} color='disabled'>
                        {distance}
                    </Typography>
                </Grid>

            </Grid>

           

                <IconButton size='small' onClick={handlFave} aria-label="favorite" className={classes.btn}>
                    {
                        faved ? <FavoriteIcon fontSize='small' color='primary' /> :
                            <HeartIcon fontSize="small" />
                    }
                </IconButton>

          
        </Card>

    )
}