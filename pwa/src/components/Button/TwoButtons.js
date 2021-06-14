import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import TuneIcon from '@material-ui/icons/Tune';
import MapIcon from '@material-ui/icons/Map';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
    rightIcon: {
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,

    },
    leftIcon: {
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
    },
    endIcon : {
        color : theme.palette.primary.main
    },
    label :{
        color :theme.palette.text.secondary
    }


}))

export default function TwoButtons() {
    const classes = useStyle();
    return (
        <ButtonGroup variant='outlined' disableElevation >
            <Button  classes={{endIcon:classes.endIcon , label : classes.label}} className={classes.rightIcon} endIcon={<MapIcon />} >نقشه</Button>
            <Button classes={{endIcon:classes.endIcon, label : classes.label}}  className={classes.leftIcon} endIcon={<TuneIcon />}>فیلتر</Button>
        </ButtonGroup>
    );
}
