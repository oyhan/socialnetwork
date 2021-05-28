import { Avatar, Divider, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { motion } from 'framer-motion';
import { Link, useHistory } from 'react-router-dom';
import { toHumanReadableDate } from '../../lib/dateHelper';
import ToolbarButton from '../Button/ToolBarButton';
import usePostLike from './postLikeHook';

const useStyle = makeStyles(theme => ({
    root: {

        height: '100vh',
        background: '#433c3c',
        color: '#ededed'
    },
    image: {
    },
    header: {
        height: '15%'
    },
    postdiv: {
        height: '50%',
        maxHeight: '50vh',
        flexWrap: 'nowrap !important',
        "& img": {
            objectFit: 'contain',
            width: '100%',
            height: 200,

        }

    },
    postText: {
        margin: '20px 8px',
    },
    footer: {
        height: '25%',
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

export default function SinglePost({ userName, likes, liked, id, createdDate, text, medias,avatarUrl }) {
    const avatar =avatarUrl;
    const history = useHistory();
    const [likesCount, userLiked, toggleLike] = usePostLike(liked, likes, id)
    const classes = useStyle();

    const handleGoBack = () => {
        history.goBack();
    }

    return (
        <>

            <Grid direction='column' className={classes.root}>
                <Grid item className={classes.header}>
                    <ToolbarButton onClick={handleGoBack} className={classes.actionBtn}>
                        انجام شد
                    </ToolbarButton>
                </Grid>
                <Grid container direction="column" className={classes.postdiv}>

                    <img  src={medias[0].url} />

                    <div className={classes.postText}>
                        {text}
                    </div>

                </Grid>
                <Grid container direction='column' className={classes.footer}>

                    <Grid container className={classes.personInfo} >
                        <Grid xs={2} item>
                            <Avatar aria-label="user avatar" src={avatar} component={Link} to={`/profile/${userName}`} className={classes.avatar} />
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
                                    userLiked ? <FavoriteIcon color='primary' /> : <FavoriteIcon htmlColor="white" />
                                }
                            </IconButton>
                        </motion.div>

                        <Typography className={classes.likes} >
                            {likesCount}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

        </>
    )

}