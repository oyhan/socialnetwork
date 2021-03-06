import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CallMissedIcon from '@material-ui/icons/CallMissed';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ReplyIcon from '@material-ui/icons/Reply';
import ReportIcon from '@material-ui/icons/Report';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import GetAvatarUrl from '../../helper/AvatarHelper';
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';
import { useStateValue } from '../../lib/store/appState';
import Dialog from '../Dialog/Dialog';
import PostSlider from './PostSlider';
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

export default function Post({ userName, createdDate, placeName, text, likes, medias, id, liked }) {
    const router = useRouter();
    
    const [{ user }] = useStateValue();
    
    const classes = useStyles();
    const [innerLikes, setLikes] = useState(likes);
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    var date = moment(createdDate);
    const [userLiked, setLiked] = useState(liked);
    const [unfollow, setUnfollow] = useState(false);
    const datephrase = date.fromNow();
    const avatar = GetAvatarUrl(userName);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleMore = () => {
        setOpen(!open);
    }
    var moreBtnItems = [{
        title: `???????????? ???? ?????????? ????????`,
        action: () => {
            BrowserHttpClient.Post(`/user/unfollow/${userName}`).then(() => {
                setUnfollow(!unfollow);
                setOpen(false);
            })
        },
        icon: <CallMissedIcon />,
        //not unfollowed before and its not him/her self
        visible: !unfollow || (user.userName != userName)
    },
    {
        title: `?????????? ???????? ?????? ??????`,
        action: () => {
            BrowserHttpClient.Post(`/post/report/${id}`).then(() => {
                setLikes(innerLikes + 1);
                setOpen(false);
            })
        },
        icon: <ReportIcon />,
        visible: true
    },
    {
        title: `?????????? ????????`,
        action: () => {
            BrowserHttpClient.Post(`/user/follow/${id}`).then(() => {
                setUnfollow(!unfollow);

                setOpen(false);
            })
        },
        icon: <TrendingFlatIcon />,
        visible: unfollow || (user.userName != userName)
    },
    ]

    const handleLike = () => {
        if (!userLiked) {
            BrowserHttpClient.Post(`/like/${id}`).then(() => {
                setLikes(innerLikes + 1);
            })
        } else {
            BrowserHttpClient.Post(`/unlike/${id}`).then(() => {
                setLikes(innerLikes - 1);
            })
        }
        setLiked(!userLiked);


    }

    const handleGotoProfile=()=>{
        router.push(`profile/${userName}`);
    }

    return (
        <Card elevation={0} id={id} className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" src={avatar} onClick={handleGotoProfile} className={classes.avatar}>
                        {userName}
                    </Avatar>
                }
                action={
                    <IconButton onClick={handleMore} aria-label="more">
                        <MoreHorizIcon />
                    </IconButton>
                }
                title={`${userName} ???? ?????? ?????????? ??????`}
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
