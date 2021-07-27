import { makeStyles, withStyles } from '@material-ui/core';
import React from 'react';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const StyledIcon = withStyles(theme => ({
    fontSizeSmall: {
        fontSize: "0.60rem"
    },
    // fontSizeMedium: {
    //     fontSize: "1.3rem"
    // },
    fontSizeLarge: {
        fontSize: "3.6rem"
    }
}))(RadioButtonUncheckedIcon);

const useStyle = (customeSize) => makeStyles({
    root: {
        fontSize: customeSize || 'unset'
    }
})

export default function RateIconEmpty({ customSize, ...props }) {
    const classes = useStyle(customSize)();

    return (
        <StyledIcon classes={{ root: customSize ? classes.root : "" }} color='primary' {...props} />
    )
}