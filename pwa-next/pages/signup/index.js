import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    text: {
        color: theme.palette.primary.main
    }
}))

export default function Signup() {
    return <>
        <Typography>
            تست فونت
    </Typography>
    </>
}