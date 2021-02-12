import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Rate from '../../Rate/Rate';
import { Chip } from '@material-ui/core';
import BoboChip from '../../Chip/Chip';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
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
        width: 200,
        justifyContent: 'space-between'
    },
}));

export default function FavoriteItem({ rate,placeType,title,commentsCount,distance }) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Card elevation={0} className={classes.root}>
            <CardMedia
                className={classes.cover}
                image="https://miro.medium.com/max/3000/1*MI686k5sDQrISBM6L8pf5A.jpeg"
                title="Live from space album cover"
            />
            <div className={classes.details}>

                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                    {title}
                    </Typography>
                    <Typography className={classes.inline}>
                        <Rate value={rate} />
                        <Typography variant='caption' className={classes.ratesCount} color='disabled'>
                            <span>{commentsCount} نظر</span>

                        </Typography>
                    </Typography>

                    <Typography variant="subtitle1" className={classes.inline} color="textSecondary">
                        <BoboChip  size="small" label={`${distance} کیلومتر`} />
                        <Typography variant='caption'>
                            فاصله از موقعیت کنونی
                        </Typography>
                    </Typography>
                    <Typography variant='subtitle1'>
                        {placeType}
                    </Typography>
                </CardContent>
                
            </div>

        </Card>
    );
}
