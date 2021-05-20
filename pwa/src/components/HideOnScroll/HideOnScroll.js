import { Fade, useScrollTrigger } from '@material-ui/core';
import React from 'react';

export default function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({threshold:150});

  

    return (
        <Fade timeout={{appear : 1000,enter:1000,exit:2000}}   in={!trigger}>
            {children}
        </Fade>
    );
}