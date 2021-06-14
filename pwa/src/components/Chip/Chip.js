import { Chip, withStyles } from '@material-ui/core';
import React from 'react';

const StyledChip = withStyles({
    root: {
        border: '1px solid #99999978',
        borderRadius: 5,
        background: '#f9f5f5',
        fontSize: 9,
        fontWeight: 400
    },
    sizeSmall: {
        height: 16,
    },
    labelSmall: {
        paddingRight: 4,
        paddingLeft: 4,
    }


})(Chip)

export default function BoboChip(props) {

    return (
        <StyledChip {...props} />
    )
}