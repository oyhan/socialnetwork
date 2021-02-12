import React from 'react';
import { withStyles, Chip } from '@material-ui/core';

const StyledChip = withStyles({
    root: {
        border: '1px solid #99999978',
        borderRadius: 5
    }
})(Chip)

export default function BoboChip(props) {

    return (
        <StyledChip {...props} />
    )
}