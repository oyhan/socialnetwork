import { Button, makeStyles } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import React from 'react';
import ButtonBobo from "./ButtonBobo";

const useStyle = makeStyles(theme => ({
    root: {
        height: 45,
        width : 152
    },
    icon : {
        marginLeft : 10
    }
}))
export default function FollowButton(props) {
    const classes = useStyle();
    return (
        <Button {...props} disableElevation variant="outlined" classes={{root: classes.root}} className="titr15" {...props} color="primary">
            دنبال کردن
            <PersonAddIcon className={classes.icon} />
        </Button>
    )
}