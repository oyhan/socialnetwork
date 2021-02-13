import { IconButton } from '@material-ui/core';
import React from 'react';
import LaunchIcon from '@material-ui/icons/Launch';
import AppBar from '../../AppBar/AppBar';

const leftIcon = [
    <IconButton aria-label="display more actions" edge="end" color="inherit">
        <LaunchIcon />
    </IconButton>
]

export default function UserProfileAppBar() {


    return (
        <AppBar leftIcons={leftIcon}   />
    )
}



