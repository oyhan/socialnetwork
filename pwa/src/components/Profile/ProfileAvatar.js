import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import ImageUploader from "../ImageUploader/ImageUploader";



const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 106,
    width: 200,
    left: '10vw',
    zIndex: 499,

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
    backgroundColor: theme.palette.common.white,
  },
  avatorBtn: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    // marginBottom: '-43px',
    // marginLeft: '43px',
  },
  avatarTxt: {
    marginTop: 19,
    marginRight: 3,
    marginLeft: 9,

  }
}));

export default function ProfileAvatar({ userName, displayName, avatarURl, onAvatarSelected, readonly }) {

  const classes = useStyles();
  return (
    <Grid container className={classes.root}>

      <IconButton size='small' className={classes.avatorBtn}>

        {/* {avatarURl ? <Avatar src={avatarfullPath} className={classes.avatar} sizes={classes.avatar} /> :
          <div > */}
        <ImageUploader thumbnailSize="90" filesLimit={1} readonly={readonly} defaultImage={avatarURl} receiveFiles={onAvatarSelected} />

        {/* </div> */}



      </IconButton>
      <Grid item direction='column' className={classes.avatarTxt}>
        <Typography color='primary' color='textPrimary' resource className='titr' variant='subtitle1'>
          {displayName}
        </Typography>
        <Typography color='primary' variant='caption'>
          {userName && `@${userName}` || '@نام کاربری'}
        </Typography>
      </Grid>

    </Grid>
  )
}