import { IconButton } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useRouter } from "next/router";
import React from 'react';

export default function ToolbarBackButton({ handleClick }) {
    const router = useRouter();
    const handleBack = () => {
        if (handleClick) {
            handleClick();
        } else {
            router.back();
        }
    }
    return (
        <IconButton onClick={handleBack} aria-label="search" edge='start' color="inherit">
            <ArrowForwardIosIcon />
        </IconButton>
    )
}