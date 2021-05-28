import { IconButton, makeStyles } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import LaunchIcon from '@material-ui/icons/Launch';
import React from 'react';
import AppBar from '../AppBar/AppBar';
import ProfileAvatar from './ProfileAvatar';
import { Link } from 'react-router-dom'


export default function ProfileAppBar({ profileDto, readonly }) {
  

  const shareProfile = async () => {
    const shareData = {
      title: `پروفایل ${profileDto.userName} را در بوبو مشاهده کنید`,
      text: "",
      url: `/profile/${profileDto.userName}`,
    }
    try {
      await navigator.share(shareData)
    } catch (err) {

    }
  }
  const leftIcon = [

    <IconButton onClick={shareProfile} aria-label="display more actions" edge="end" color="inherit">
      <LaunchIcon />
    </IconButton>,
    <IconButton component={Link} to="/settings" aria-label="search" color="inherit">
      <Settings />
    </IconButton>,
  ]


  const extera = (
    <ProfileAvatar readonly={readonly}  {...profileDto} />
  )

  return (
    <AppBar leftIcons={leftIcon} extera={extera} />
  )
}



