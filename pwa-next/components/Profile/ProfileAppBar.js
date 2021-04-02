import { Avatar, Button, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import React from 'react';
import LaunchIcon from '@material-ui/icons/Launch';
import AppBar from '../AppBar/AppBar';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ProfileAvatar from './ProfileAvatar';

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
  avatarTxt: {
    marginBottom: '-59px',
    marginLeft: 119,
  }
}));
const leftIcon = [

  <IconButton aria-label="display more actions" edge="end" color="inherit">
    <LaunchIcon />
  </IconButton>,
  <IconButton aria-label="search" color="inherit">
    <Settings />
  </IconButton>,
]

export default function ProfileAppBar({ profileDto }) {
  const classes = useStyles();

  const extera = (
    <ProfileAvatar {...profileDto} />
  )

  return (
    <AppBar leftIcons={leftIcon} extera={extera} />
  )
}



