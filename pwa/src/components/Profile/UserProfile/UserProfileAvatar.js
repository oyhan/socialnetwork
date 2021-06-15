import { Avatar, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import BlockIcon from '@material-ui/icons/Block';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ReportIcon from '@material-ui/icons/Report';
import { useState } from "react";
import MoreDialog from "../../Dialog/Dialog";
const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top: 104,
        width: 320,
        left: '10vw',
        zIndex: 10000,

        [theme.breakpoints.up('md')]: {
            left: '25vw',
        },
        [theme.breakpoints.up('lg')]: {
            left: '26vw',
        },
        [theme.breakpoints.up('xl')]: {
            left: '34vw',
        },

    },
    avatar: {
        width: 90,
        height: 90,
        // color: theme.palette.secondary.light,
        border: '5px solid',
        backgroundColor: theme.palette.tertiary.main,
    },
    avatorBtn: {
        width: theme.spacing(9),
        height: theme.spacing(9),
        color: 'white',
        // marginBottom: '-43px',
        // marginLeft: '43px',
    },
    avatarTxt: {
        marginTop: 19,
        marginRight: 3,
        marginLeft: 9,

    },
    more: {
        lineHeight: 4.5,
        marginLeft: 'auto',
        marginRight: 11,
    }
}));

export default function UserProfileAvatar({ userName, displayName, avatarURl }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleUserMoreButton = () => {
        setOpen(!open);
    }
    const avatarfullPath = avatarURl;

    const moreBtnItems = [{
        title: `بلاک کردن ${userName}`,
        action: () => { },
        icon: <BlockIcon />,
        visible: true
    },
    {
        title: `گزارش‌کردن این پروفایل`,
        action: () => { },
        icon: <ReportIcon />,
        visible: true
    }
    ]

    return (
        <Grid container className={classes.root}>
            <IconButton size='small' className={classes.avatorBtn}>
                <Avatar className={classes.avatar} src={avatarfullPath} sizes={classes.avatar}>
                    <AddAPhotoIcon />
                </Avatar>
            </IconButton>
            <Grid item direction='column' className={classes.avatarTxt}>
                <Typography color='textPrimary' className='titr'>
                    {displayName}
                </Typography>
                <Typography color='primary' variant='caption'>
                    {userName && `@${userName}` || '@نام کاربری'}
                </Typography>
            </Grid>
            <Grid item className={classes.more} >
                <IconButton onClick={handleUserMoreButton} size='small' >
                    <MoreHorizIcon />
                </IconButton>
            </Grid>
            <MoreDialog open={open} items={moreBtnItems} handleClose={handleUserMoreButton} />
        </Grid>
    )
}