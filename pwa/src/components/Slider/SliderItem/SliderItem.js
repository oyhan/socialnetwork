import { Card, CardActions, CardContent, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import RoomIcon from '@material-ui/icons/Room';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { BrowserHttpClient } from '../../../lib/BrowserHttpClient';
import Rate from '../../Rate/Rate';
const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        maxWidth: 150,
        minWidth: 122,
        height: 124
    },
    media: {
        height: 88,
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
        fontSize: "10px",
        lineHeight: "16px",
        paddingLeft: 4,
    },
    inline: {
        display: 'flex'
    },
    distance: {
        fontSize: 9,
        marginRight: 0,
        lineHeight: 1.5,
    },
    content: {
        "& div": {
            marginBottom: -2
        },
        padding: 1
    },
    placeTitle: {
        fontSize: 11,
        marginBottom: '-4px',
        marginTop: '-5px',
    },
    smalIcon :{
        fontSize : '.7rem'
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
            <CardContent className={classes.content} >
                <Typography className={classes.placeTitle} variant="caption" component="h6">
                    {title}
                </Typography>
                <div className={classes.inline}>
                    <Rate size='small' value={rate} />
                    <Typography className={classes.ratesCount} color='textSecondary'>
                        <span>({ratesCount})</span>

                    </Typography>
                </div>
                <div className={classes.inline}>
                    <RoomIcon classes={{fontSizeSmall : classes.smalIcon}} fontSize="small" />
                    <Typography className={classes.distance} color='disabled'>
                        {distance}
                    </Typography>
                </div>

            </CardContent>


            <CardActions>

                <IconButton size='small' onClick={handlFave} aria-label="favorite" className={classes.btn}>
                    {
                        faved ? <FavoriteIcon fontSize='small' color='primary' /> :
                            <FavoriteTwoToneIcon fontSize="small" />
                    }
                </IconButton>

            </CardActions>
        </Card>

    )
}