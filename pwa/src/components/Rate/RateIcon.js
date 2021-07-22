import { makeStyles, withStyles } from '@material-ui/core';
import RadioButtonCheckedTwoToneIcon from '@material-ui/icons/RadioButtonCheckedTwoTone';
import React from 'react';

const StyledIcon = withStyles(theme => ({
    fontSizeSmall: {
        fontSize: "0.60rem"
    },
    fontSizeMedium: {
        fontSize: "1.3rem"
    },
    fontSizeLarge: {
        fontSize: "3.6rem"
    },

}))(RadioButtonCheckedTwoToneIcon);

const useStyle = (customeSize) => makeStyles({
    root: {
        fontSize: customeSize || 'unset'
    }
})

export default function RateIcon({ customSize, ...props }) {
    const classes = useStyle(customSize)();
    return (
        <StyledIcon classes={{ root: customSize ? classes.root : "" }}   {...props} />
    )
}