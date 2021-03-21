import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReplyIcon from '@material-ui/icons/Reply';
import PostSlider from './PostSlider';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Dialog from '../Dialog/Dialog';
import CallMissedIcon from '@material-ui/icons/CallMissed';
import ReportIcon from '@material-ui/icons/Report';
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import { useStateValue } from '../../lib/store/appState';
require('moment/locale/fa');

var moment = require('moment-jalaali')
moment.loadPersian({ dialect: 'persian-modern' })

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        margin: "20px 0"
    },
    media: {
        height: 250,
        // paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    sharebtn: {
        marginLeft: 'auto'
    },
    text: {
        padding: theme.spacing(1)
    },
    actions: {
        padding: 0
    }
}));

export default function Post({ username, createdDate, placeName, text, likes, medias, id, liked }) {
    const [{ user }] = useStateValue();
    const classes = useStyles();
    const [innerLikes, setLikes] = useState(likes);
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    var date = moment(createdDate);
    const [userLiked, setLiked] = useState(liked);
    const [unfollow, setUnfollow] = useState(false);
    const datephrase = date.fromNow();
    const avatar = `http://localhost:12089/user/${username}/avatar/avatar.webp`;


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleMore = () => {
        setOpen(!open);
    }
    var moreBtnItems = [{
        title: `انصراف از دنبال کردن`,
        action: () => {
            BrowserHttpClient.Post(`http://localhost:12089/user/unfollow/${username}`).then(() => {
                setUnfollow(!unfollow);
                setOpen(false);
            })
        },
        icon: <CallMissedIcon />,
        //not unfollowed before and its not him/her self
        visible: !unfollow || (user.userName != username)
    },
    {
        title: `گزارش کردن این عکس`,
        action: () => {
            BrowserHttpClient.Post(`http://localhost:12089/post/report/${id}`).then(() => {
                setLikes(innerLikes + 1);
                setOpen(false);
            })
        },
        icon: <ReportIcon />,
        visible: true
    },
    {
        title: `دنبال کردن`,
        action: () => {
            BrowserHttpClient.Post(`http://localhost:12089/user/follow/${id}`).then(() => {
                setUnfollow(!unfollow);

                setOpen(false);
            })
        },
        icon: <TrendingFlatIcon />,
        visible: unfollow || (user.userName != username)
    },
    ]

    const handleLike = () => {
        if (!userLiked) {
            BrowserHttpClient.Post(`http://localhost:12089/like/${id}`).then(() => {
                setLikes(innerLikes + 1);
            })
        } else {
            BrowserHttpClient.Post(`http://localhost:12089/unlike/${id}`).then(() => {
                setLikes(innerLikes - 1);
            })
        }
        setLiked(!userLiked);


    }

    return (
        <Card elevation={0} id={id} className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" src={avatar} className={classes.avatar}>
                        {username}
                    </Avatar>
                }
                action={
                    <IconButton onClick={handleMore} aria-label="more">
                        <MoreHorizIcon />
                    </IconButton>
                }
                title={`${username} یک عکس اضافه کرد`}
                subheader={`${datephrase}/${placeName}`}
            />

            <PostSlider
                className={classes.media}
                medias={medias} />

            <CardContent classes={
                {
                    root: classes.text
                }
            }>
                <Typography variant="body2" color="textSecondary" component="p">
                    {text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing classes={{
                root: classes.actions
            }}>
                <IconButton onClick={handleLike} aria-label="add to favorites">
                    {
                        userLiked ? <FavoriteIcon color='primary' /> : <FavoriteBorderIcon />
                    }
                </IconButton>
                <Typography>
                    {innerLikes}
                </Typography>
                <IconButton className={classes.sharebtn} aria-label="share">
                    <ReplyIcon />
                </IconButton>
            </CardActions>

            <Dialog open={open} items={moreBtnItems} handleClose={handleMore} />

        </Card>
    );
}
