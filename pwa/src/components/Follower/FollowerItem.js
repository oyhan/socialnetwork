import { Box, Divider, Grid } from '@material-ui/core';
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
import { Link } from 'react-router-dom';
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';
import { useStateValue } from '../../lib/store/appState';
import FollowButton from '../Button/FollowButton';
import FollowerButton from '../Button/FollowerButton';
import AppDivider from '../Dividers/AppDivider';
const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
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
    width: 47,
    height: 47,
  },
  indented: {
    marginLeft: 40,
    padding: '5px 0',
  },
  cardHeaderRoot: {
    padding: '16px 0 '
  },
  cardHeaderContent: {
    marginLeft: -5
  },
  indented2: {
    marginLeft: 48,
    padding: '10px 0',
  }

}));

export default function FollowerItem({ fullName, userName, id, location, avatarUrl, isFollowingBack }) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [following, setFollowing] = React.useState(isFollowingBack);
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

  const UserTitle = ({ displayName }) => <>
    <Typography component='span' className='titr19700'>
      {displayName}
    </Typography>

  </>

  const Username = ({ userName }) => <>
    <Typography component='span' color='textPrimary' className='s15' >
      {userName}
    </Typography>

  </>
  const mySelf = user.userName == userName;
  return (
    <>
      <Card elevation={0} className={classes.root}>

        <CardHeader
          classes={{ root: classes.cardHeaderRoot, content: classes.cardHeaderContent }}
          avatar={
            <Link to={`/profile/${userName}`}>
              <Avatar src={avatarUrl} aria-label="avatar" className={classes.avatar} />
            </Link>
          }
          title={<UserTitle displayName={fullName} />}
          subheader={<Username userName={`@${userName}`} />}
        />

        <CardContent className={classes.indented}>
          <Grid container>
            <LocationOn htmlColor='black' />
            <Box m='2px'>
              <Typography variant="body2" color="textPrimary" className='s15' component="p">
                {location}
              </Typography>
            </Box>
          </Grid>
        </CardContent>
        <CardActions className={classes.indented2} disableSpacing>
          {mySelf ? "" : following ? <FollowerButton onClick={handleUnFollow} /> :
            <FollowButton onClick={handleFollow} />
          }
        </CardActions>

      </Card>
      <AppDivider/>
    </>
  );
}
