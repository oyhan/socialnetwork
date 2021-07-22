import { IconButton, makeStyles } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory } from "react-router-dom";
import React from 'react';

const useStyle = makeStyles({
    backBtn : {
        "& svg" : {
            fontSize : 33
        }
    }
})

export default function ToolbarBackButton({ handleClick }) {
    const classes = useStyle();
    const router = useHistory();
    const handleBack = () => {
        if (handleClick) {
            handleClick();
        } else {
            router.goBack();
        }
    }
    return (
        <IconButton onClick={handleBack} className={classes.backBtn} aria-label="search" edge='start'  color="inherit">
            <ArrowForwardIosIcon  />
        </IconButton>
    )
}