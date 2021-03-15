import { Avatar, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ImageUploader from "../ImageUploader/ImageUploader";



const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 104,
    width:145,
    left:40,
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    // color: theme.palette.secondary.light,
    border: '4px solid',
    backgroundColor: theme.palette.common.white,
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

export default function ProfileAvatar({ userName, displayName, avatarURl, onAvatarSelected }) {
  
  
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      
      <IconButton size='small' className={classes.avatorBtn}>

        {avatarURl ? <Avatar src={`http://localhost:12089${avatarURl}`} className={classes.avatar} sizes={classes.avatar} /> :
          <div >
            <ImageUploader receiveFiles={onAvatarSelected} />

          </div>

        }

      </IconButton>
      <Grid item direction='column' className={classes.avatarTxt}>
        <Typography color='primary' resource variant='subtitle2'>
          {displayName}
        </Typography>
        <Typography color='primary' variant='caption'>
          {userName && `@${userName}` || '@نام کاربری'}
        </Typography>
      </Grid>

    </Grid>
  )
}