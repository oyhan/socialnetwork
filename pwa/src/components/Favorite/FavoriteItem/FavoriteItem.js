import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import React, { useState } from 'react';
import { BrowserHttpClient } from '../../../lib/BrowserHttpClient';
import BoboChip from '../../Chip/Chip';
import Rate from '../../Rate/Rate';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        margin : '0 10px'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '73%'
    },
    content: {
        flex: '1 0 auto',
        width: '100%'
    },
    cover: {
        width: 100,
        height: 100
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    inline: {
        margin: '10px 0 7px 0',
        display: 'flex',
        justifyContent: 'space-between'
    },
}));

export default function FavoriteItem({ rate, placeType, name, noOfReviews, distanceString, isOpen ,id}) {
    const classes = useStyles();
    const theme = useTheme();
    const [faved, setFaved] = useState(true);


    
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
        <>
            <Card elevation={0} className={classes.root}>
                <CardMedia
                    className={classes.cover}
                    image="https://miro.medium.com/max/3000/1*MI686k5sDQrISBM6L8pf5A.jpeg"
                    title="Live from space album cover"
                />
                <div className={classes.details}>

                    <CardContent className={classes.content}>
                        <div className={classes.inline}>
                            <Typography component="h6" variant="h6">
                                {name}
                            </Typography>
                            <span>
                                <IconButton onClick={handlFave} aria-label="add to favorites">
                                    {
                                        faved ? <FavoriteIcon color='primary' /> : <FavoriteBorderIcon />
                                    }
                                </IconButton>
                            </span>
                        </div>
                        <Typography className={classes.inline}>
                            <Rate value={rate} />
                            <Typography variant='caption' className={classes.ratesCount} color='disabled'>
                                <span>{noOfReviews} نظر</span>
                                <span>{isOpen ? "باز است" : ""}</span>

                            </Typography>
                        </Typography>

                        <Typography variant="caption" className={classes.inline} color="textSecondary">
                            <BoboChip size="small" label={`${distanceString}`} />
                            <Typography variant='caption'>
                                فاصله از موقعیت کنونی
                        </Typography>
                        </Typography>
                        <Typography variant='caption'>
                            {placeType}
                        </Typography>
                    </CardContent>

                </div>

            </Card>
        </>

    );
}
