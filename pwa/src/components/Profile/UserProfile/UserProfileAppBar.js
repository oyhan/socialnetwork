import { IconButton } from '@material-ui/core';
import React from 'react';
import AppBar from '../../AppBar/AppBar';
import IosShareIcon from '../../Icons/IosShareIcon';


export default function UserProfileAppBar({ headerPic ,userName }) {
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
        <IconButton className="z-index-510" onClick={shareProfile} aria-label="display more actions" edge="end" color="inherit">
            <IosShareIcon />
        </IconButton>
    ]
    
    return (
        <AppBar headerPic={headerPic} leftIcons={leftIcon} />
    )
}



