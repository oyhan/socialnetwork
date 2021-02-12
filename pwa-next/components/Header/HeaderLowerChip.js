import { Chip, makeStyles } from '@material-ui/core';
import React from 'react'
import NearMeIcon from '@material-ui/icons/NearMe';


const useStyles = makeStyles((theme) => ({

    chip: {
        alignSelf: 'center',
        marginTop: 6,
        background: '#00000094',
        color: 'white',
        borderRadius: 8,
    },
    chipIcon: {
        color: 'white'
    },
    clickable: {
        '&:hover': {
            backgroundColor: '#00000094',
        },
        '&:focus': {
            backgroundColor: '#00000094',
        }
    }
}))

export default function HeaderLowerChip({ title, handleClick }) {
    const classes = useStyles();
    return (
        <Chip
            icon={<NearMeIcon />}
            classes={{
                icon: classes.chipIcon,
                clickable: classes.clickable
            }}
            onClick={handleClick}
            label={title}
            className={classes.chip}
        />
    )

}