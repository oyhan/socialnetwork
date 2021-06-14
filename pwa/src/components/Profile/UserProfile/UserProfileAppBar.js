import { IconButton } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import React from 'react';
import AppBar from '../../AppBar/AppBar';

const leftIcon = [
    <IconButton aria-label="display more actions" edge="end" color="inherit">
        <LaunchIcon />
    </IconButton>
]

export default function UserProfileAppBar({headerPic}) {


    return (
        <AppBar headerPic={headerPic} leftIcons={leftIcon}   />
    )
}



