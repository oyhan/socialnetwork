import { Avatar, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

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
    backgroundColor: theme.palette.secondary.main,
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

  }
}));

export default function ProfileAvatar({username}) {
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
         {username && `@${username}` ||  '@نام کاربری'}
              </Typography>
      </Grid>

    </Grid>
  )
}