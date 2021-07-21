import { makeStyles } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import React from 'react';
import ButtonBobo from "./ButtonBobo";
const useStyle = makeStyles(theme => ({
    root: {
        height: 45,
        width : 152
    },
    icon : {
        marginLeft : 5
    }
}))

export default function FollowerButton(props) {
    const classes = useStyle();
    return (
        <ButtonBobo {...props} classes={{root: classes.root}} className="titr15" variant="contained" color="primary">
            دنبال شونده
            <PersonAddIcon  className={classes.icon}/>
        </ButtonBobo>
    )
}