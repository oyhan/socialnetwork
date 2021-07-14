import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import React, { useEffect, useState } from 'react';
import { BrowserHttpClient } from '../../../lib/BrowserHttpClient';
import BoboChip from '../../Chip/Chip';
import Rate from '../../Rate/Rate';
import clsx from 'clsx';
import RoomIcon from '@material-ui/icons/Room';
import { Divider } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        margin : '0 10px',
        background : 'rgba(245, 243, 243, 1)'
    },
    details: {
        width: '73%',
        display: 'flex',
        flexDirection: 'column',
        margin: '-12px -3px',
    },
    content: {
        flex: '1 0 auto',
        width: '100%',
        padding: '0 10px',
        paddingTop: 16,
    },
    cover: {
        width: 86,
        height: 86
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    inline: {
        margin: '10px 0 7px 0',
        display: 'flex',
        // justifyContent: 'space-between'
    },
    placeTitle: {
        fontSize: 12,
        fontWeight: 900
    },
    titleRow: {
        marginBottom: -21
    },
    openStatus: {
        marginLeft: 7
    },
    noOfReviews: {
        marginLeft: 4
    },
    ratesCount: {
        fontSize: 10,
        lineHeight: 2.4,
        // letterSpacing: '.5px',
    },
    firstRow:{
        marginTop:17
    },
    distance: {
        fontSize : 9,
        lineHeight: 2.5,
    }
}));

export default function FavoriteItem({ rate, placeType, name, noOfReviews, distanceString, isOpen, id, iconic ,favorite }) {
    const classes = useStyles();
    const [faved, setFaved] = useState(true);

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
        <>
            <Card elevation={0} className={classes.root}>
                <CardMedia
                    className={classes.cover}
                    image="/coffeeshop2.jpg"
                    title="علاقه‌مندی"
                />
                <div className={classes.details}>

                    <CardContent className={classes.content}>
                        <div className={clsx(classes.inline, classes.spaceBetween, classes.titleRow, classes.firstRow)}>
                            <Typography component="h6" className={classes.placeTitle} variant="h6">
                                {name}
                            </Typography>
                            <span>
                                <IconButton size='small' onClick={handlFave} aria-label="add to favorites">
                                    {
                                        faved ? <FavoriteIcon fontSize='small' color='secondary' /> : <FavoriteBorderIcon fontSize='small' />
                                    }
                                </IconButton>
                            </span>
                        </div>
                        <Typography className={clsx(classes.inline, classes.titleRow)}>
                            <Rate size='small' value={rate} />
                            <Typography variant='caption' className={clsx(classes.ratesCount)} color='textSecondary'>
                                <span className={classes.noOfReviews}>{noOfReviews} نظر</span>.
                                <span className={classes.openStatus}>{isOpen ? "باز است" : "بسته است"}</span>
                            </Typography>
                        </Typography>
                        <Typography color='textSecondary' className={clsx(classes.inline, classes.ratesCount)}>
                            ایرانی
                        </Typography>
                        {
                            iconic ? <div className={clsx(classes.inline,)}>
                                <RoomIcon fontSize="small" classes={{fontSizeSmall : 'f1rem '}}/>
                                <Typography className={classes.distance} color='disabled'>
                                    {distanceString}
                                </Typography>
                            </div> :
                                <Typography variant="caption" className={classes.inline} color="textSecondary">
                                    <BoboChip size="small" label={`${distanceString}`} />
                                    <Typography variant='caption'>
                                        فاصله از موقعیت کنونی
                                    </Typography>
                                </Typography>
                        }

                        <Typography variant='caption'>
                            {placeType}
                        </Typography>
                    </CardContent>

                </div>

            </Card>
            <Divider style={{ width: '100%' }} />

        </>

    );
}
