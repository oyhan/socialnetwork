import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, makeStyles, IconButton } from '@material-ui/core';
import dummyimage from './coffeeshop2.jpg'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import Rate from '../../Rate/Rate';
import RoomIcon from '@material-ui/icons/Room';
import FavoriteIcon from '@material-ui/icons/Favorite';
const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        maxWidth: 200,
        minWidth: 200,
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
export default function SliderItem({ image, title, rate, ratesCount, distance, favorite, faveCallBack }) {
    const classes = useStyles();

    const handlFave = () => {

        faveCallBack && faveCallBack();
    }

    return (
        <Card elevation={0} className={classes.root}>


            <CardMedia
                className={classes.media}
                image={image}
                title="Contemplative Reptile"
            />
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
                        {distance} کیلومتر

                    </Typography>
                </div>

            </CardContent>


            <CardActions>

                <IconButton onClick={handlFave} aria-label="favorite" className={classes.btn}>
                    {
                        favorite ? <FavoriteIcon color='primary' /> :
                            <FavoriteTwoToneIcon fontSize="small" />
                    }
                </IconButton>

            </CardActions>
        </Card>
    )
}