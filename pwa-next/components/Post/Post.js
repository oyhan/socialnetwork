import React from 'react';
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

export default function Post({ username, month, year, placeName, text, likes, medias }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleMore  = ()=>{
        setOpen(!open);

    }
    const moreBtnItems = [{
        title: `انصراف از دنبال کردن`,
        action: () => { },
        icon : <CallMissedIcon/>
    },
    {
        title: `گزارش کردن این عکس`,
        action: () => { console.log("report picture") },
        icon : <ReportIcon/>
    }]

    return (
        <Card elevation={0} className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
          </Avatar>
                }
                action={
                    <IconButton onClick={handleMore} aria-label="more">
                        <MoreHorizIcon />
                    </IconButton>
                }
                title={`${username} یک عکس اضافه کرد`}
                subheader={`${month} ${year}/${placeName}`}
            />
            {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}

            <PostSlider
                className={classes.media}
                medias={medias} />

            {/* </CardMedia> */}
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
                <IconButton aria-label="add to favorites">
                    <FavoriteBorderIcon />
                </IconButton>
                <Typography>
                    {likes}
                </Typography>
                <IconButton className={classes.sharebtn} aria-label="share">
                    <ReplyIcon />
                </IconButton>
            </CardActions>
            
            <Dialog open={open} items={moreBtnItems} handleClose={handleMore} />

        </Card>
    );
}
