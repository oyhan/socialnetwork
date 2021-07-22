import { IconButton } from '@material-ui/core';
import React from 'react';
import AppBar from '../../AppBar/AppBar';
import IosShareIcon from '../../Icons/IosShareIcon';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export default function UserProfileAppBar({ headerPic, userName, handleFollow, following }) {
  const shareProfile = async () => {
    const shareData = {
      title: `پروفایل ${userName} را در بوبو مشاهده کنید`,
      text: "",
      url: `/profile/${userName}`,
    }
    try {
      await navigator.share(shareData)
    } catch (err) {
      console.log('err: ', err);

    }
  }

  const leftIcon = [
    following ? "" : <IconButton className="z-index-510" onClick={handleFollow} aria-label="display follow actions" edge="end" color="inherit">
      <PersonAddIcon />
    </IconButton>,
    <IconButton className="z-index-510" onClick={shareProfile} aria-label="display more actions" color="inherit">
      <IosShareIcon />
    </IconButton>

  ]

  return (
    <AppBar headerPic={headerPic} paddingTop={10}  paddingLeft='2%' back leftIcons={leftIcon} />
  )
}



