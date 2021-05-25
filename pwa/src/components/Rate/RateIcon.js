import { withStyles } from '@material-ui/core';
import RadioButtonCheckedTwoToneIcon from '@material-ui/icons/RadioButtonCheckedTwoTone';
import React from 'react';

const StyledIcon = withStyles(theme => ({
    fontSizeSmall : {
        fontSize : "0.80rem"
    } 
}))(RadioButtonCheckedTwoToneIcon);

export default function RateIcon(props) {
    return (
        <StyledIcon  {...props} />
    )
}