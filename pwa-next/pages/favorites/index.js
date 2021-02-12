import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    text: {
        color: theme.palette.primary.main
    }
}))

export default function MyBobo() {
    return <>
        <Typography>
            علاقه مندی ها
    </Typography>
    </>
}