import { withStyles } from '@material-ui/core';
import React from 'react';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const StyledIcon = withStyles(theme => ({
    fontSizeSmall : {
        fontSize : "0.60rem"
    } ,
    fontSizeMedium:{
        fontSize : "1.3rem"
    },
    fontSizeLarge:{
        fontSize : "3.6rem"
    } 
}))(RadioButtonUncheckedIcon);

export default function RateIconEmpty(props) {
    return (
        <StyledIcon color='primary' {...props} />
    )
}