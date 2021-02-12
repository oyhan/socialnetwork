import React from 'react';
import MAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { Avatar, Grid } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rightIcon: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-start',
    textAlign: 'center'
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
    marginBottom: '-43px',
    marginLeft: '43px',
  },
  avatarTxt : {
    marginBottom: '-59px',
    marginLeft: 119,
  }
}));

export default function AppBar({ rightIcon, title, leftIcons, middleCenterElement,extera }) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MAppBar elevation={0} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.rightIcon}>
            {rightIcon}
          </div>
          <Typography className={classes.title} variant="button" noWrap>
            {title}
          </Typography>
          {
            leftIcons && leftIcons.map(icon => icon)
          }

        </Toolbar>

       {extera}

      </MAppBar>

    </div>
  );
}

{/* <>
<IconButton aria-label="search" color="inherit">
  <SearchIcon />
</IconButton>
<IconButton aria-label="display more actions" edge="end" color="inherit">
  <MoreIcon />
</IconButton>
</> */}


{/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >

            {rightIcon}
          </IconButton> */}