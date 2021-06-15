import { withStyles } from '@material-ui/core';
import RadioButtonCheckedTwoToneIcon from '@material-ui/icons/RadioButtonCheckedTwoTone';
import React from 'react';

const StyledIcon = withStyles(theme => ({
    fontSizeSmall : {
        fontSize : "0.70rem"
    },
    fontSizeMedium:{
        fontSize : "1.3rem"
    } ,
    fontSizeLarge:{
        fontSize : "1.6rem"
    } 
}))(RadioButtonCheckedTwoToneIcon);

export default function RateIcon(props) {
    return (
        <StyledIcon  {...props} />
    )
}