import { Avatar, Divider, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import { useParams, Link, useHistory } from 'react-router-dom';
import GetAvatarUrl from '../../helper/AvatarHelper';
import ToolbarButton from '../Button/ToolBarButton';
import usePostLike from './postLikeHook';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toHumanReadableDate } from '../../lib/dateHelper';

const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: '#433c3c',
        color: '#ededed'
    },

    header: {
        flex: 1
    },
    postdiv: {
        flex: 2,
        maxHeight: '50vh',
        flexWrap : 'nowrap !important',
        "& img": {
            width: '100%',
            aspectRatio: '4/3',
            margin: '0 auto',
        }

    },
    postText: {
        margin: '20px 8px',
    },
    footer: {
        flex: 1
    },
    avatar: {
        width: 28,
        border: '2px solid white',
        height: 28,
        marginTop: 1,
        marginLeft: 13,
    },
    senderDiv: {
        marginLeft: '-13px',
        fontSize: 12,
    },
    date: {
        fontSize: 10,
        color: 'rgb(219 219 219 / 54%)'
    },
    actionBtn: {
        margin: 10,
    },
    personInfo: {
        height: 50
    },
    divider: {
        backgroundColor: 'rgb(255 255 255)',
        width: '100%'
    },
    likes: {
        alignSelf: 'center',
    }

}));

export default function SinglePost({ userName, likes, liked, id, createdDate, text, medias }) {
    const avatar = GetAvatarUrl(userName);
    const history = useHistory();
    const [likesCount, userLiked, toggleLike] = usePostLike(liked, likes, id)
    const classes = useStyle();

    const handleGoBack = () => {
        history.goBack();
    }

    return (
        <>

            <div className={classes.root}>
                <div className={classes.header}>
                    <ToolbarButton onClick={handleGoBack} className={classes.actionBtn}>
                        انجام شد
                    </ToolbarButton>
                </div>
                <Grid container direction="column" className={classes.postdiv}>
                    <img src={medias[0].url} />
                    <div className={classes.postText}>
                        {text}
                    </div>

                </Grid>
                <Grid container direction='column' className={classes.footer}>

                    <Grid container className={classes.personInfo} >
                        <Grid xs={2} item>
                            <Avatar aria-label="user avatar" src={avatar} component={Link} to={`profile/${userName}`} className={classes.avatar} />
                        </Grid>
                        <Grid className={classes.senderDiv} xs={9} item>
                            <Grid direction="column" container>
                                <Grid item>
                                    {userName}
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.date} color="textSecondary">
                                        {toHumanReadableDate(createdDate)}
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Grid>

                    </Grid>

                    <Grid container>
                        <Divider className={classes.divider} />
                    </Grid>
                    <Grid container>
                        <motion.div
                            whileTap={{ scale: 1.5 }}
                        >
                            <IconButton onClick={toggleLike} aria-label="add to favorites">
                                {
                                    userLiked ? <FavoriteIcon htmlColor="white" /> : <FavoriteBorderIcon />
                                }
                            </IconButton>
                        </motion.div>

                        <Typography className={classes.likes} >
                            {likesCount}
                        </Typography>
                    </Grid>
                </Grid>
            </div>

        </>
    )

}