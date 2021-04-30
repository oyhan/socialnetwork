import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { LocationOn } from '@material-ui/icons';
import React from 'react';
import GetAvatarUrl from '../../helper/AvatarHelper';
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';
import { useStateValue } from '../../lib/store/appState';
import FollowButton from '../Button/FollowButton';
import FollowerButton from '../Button/FollowerButton';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
  indented: {
    marginLeft: 60
  }
}));

export default function FollowerItem({ fullName, userName, id, location }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [following, setFollowing] = React.useState(true);
  const [{ user }] = useStateValue();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleUnFollow = () => {
    BrowserHttpClient.Post(`/user/unfollow/${userName}`).then(() => {
      setFollowing(false);
    })
  }
  const handleFollow = () => {
    BrowserHttpClient.Post(`/user/follow/${userName}`).then(() => {
      setFollowing(true);
    })
  }
  const mySelf = user.userName == userName;
  return (
    <Card elevation={0} className={classes.root}>
      <CardHeader
        avatar={
          <Avatar src={GetAvatarUrl(userName)} aria-label="avatar" className={classes.avatar} />
        }
        title={`${fullName}`}
        subheader={userName}
      />

      <CardContent className={classes.indented}>
        <Typography variant="body2" color="textSecondary" component="p">
          <LocationOn />
          {location}
        </Typography>
      </CardContent>
      <CardActions className={classes.indented} disableSpacing>
        {mySelf ? "" : following ? <FollowerButton onClick={handleUnFollow} /> :
          <FollowButton onClick={handleFollow} />
        }
      </CardActions>

    </Card>
  );
}
