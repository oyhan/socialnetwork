import { IconButton } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory } from "react-router-dom";
import React from 'react';

export default function ToolbarBackButton({ handleClick }) {
    const router = useHistory();
    const handleBack = () => {
        if (handleClick) {
            handleClick();
        } else {
            router.goBack();
        }
    }
    return (
        <IconButton onClick={handleBack} aria-label="search" edge='start' color="inherit">
            <ArrowForwardIosIcon />
        </IconButton>
    )
}