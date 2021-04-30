import { Card, CardActions, CardContent, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import RoomIcon from '@material-ui/icons/Room';
import Link from 'next/link';
import React, { useState } from 'react';
import { BrowserHttpClient } from '../../../lib/BrowserHttpClient';
import Rate from '../../Rate/Rate';
const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        maxWidth: 200,
        minWidth: 200,
        maxHeight: 265
    },
    media: {
        height: 140,
    },
    btn: {
        position: 'absolute',
        top: 10,
        right: 5,
        background: '#ffffff7d',
        "&:hover": {
            // background :theme.palette.secondary.light
        }

        // display:'flex',
        // flexDirection  : 'column',
        // alignItems : 'center',
    },
    ratesCount: {

        paddingLeft: '9px',
        lineHeight: '19px'

    },
    inline: {
        display: 'flex'
    },
    distance: {
        marginLeft: '4px'
    }

}));
export default function SliderItem({ image, title, rate, ratesCount, distance, favorite, faveCallBack, id }) {
    const classes = useStyles();
    const [faved, setFaved] = useState(favorite);
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
            <Link href={`place/${id}`} >

                <CardMedia
                    className={classes.media}
                    image={image}
                    title=""
                />
            </Link>
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                    {title}
                </Typography>
                <div className={classes.inline}>
                    <Rate value={rate} />
                    <Typography className={classes.ratesCount} color='disabled'>
                        <span>({ratesCount})</span>

                    </Typography>
                </div>
                <div className={classes.inline}>
                    <RoomIcon />
                    <Typography className={classes.distance} color='disabled'>
                        {distance}

                    </Typography>
                </div>

            </CardContent>


            <CardActions>

                <IconButton onClick={handlFave} aria-label="favorite" className={classes.btn}>
                    {
                        faved ? <FavoriteIcon color='primary' /> :
                            <FavoriteTwoToneIcon fontSize="small" />
                    }
                </IconButton>

            </CardActions>
        </Card>

    )
}