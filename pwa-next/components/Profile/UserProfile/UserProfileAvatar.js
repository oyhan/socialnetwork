import { Avatar, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top: 104,
        left: 34,
    },
    avatar: {
        width: theme.spacing(9),
        height: theme.spacing(9),
        // color: theme.palette.secondary.light,
        border: '4px solid',
        backgroundColor: theme.palette.tertiary.main,
    },
    avatorBtn: {
        width: theme.spacing(9),
        height: theme.spacing(9),
        // marginBottom: '-43px',
        // marginLeft: '43px',
    },
    avatarTxt: {
        marginTop: 23,
        marginRight: 3

    },
    more: {
        lineHeight: 4.5,
        marginLeft: 'auto',
        marginRight: 52,
    }
}));

export default function UserProfileAvatar({ username }) {
    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <IconButton size='small' className={classes.avatorBtn}>
                <Avatar className={classes.avatar} sizes={classes.avatar}>
                    <AddAPhotoIcon />
                </Avatar>
            </IconButton>
            <Grid item direction='column' className={classes.avatarTxt}>
                <Typography color='primary' resource variant='subtitle2'>
                    نام نمایشی
              </Typography>
                <Typography color='primary' variant='caption'>
                    {username && `@${username}` || '@نام کاربری'}
                </Typography>
            </Grid>
            <Grid item className={classes.more} >
                <IconButton size='small' >
                    <MoreHorizIcon />
                </IconButton>
            </Grid>

        </Grid>
    )
}