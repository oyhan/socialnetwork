import { Chip, makeStyles } from '@material-ui/core';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import React from 'react';


const useStyles = makeStyles((theme) => ({

    chip: {
        alignSelf: 'center',
        '& svg': {
            color: theme.palette.primary.main
        },
        height: 29,
        background :'white',


    },
    chipSecondary :{
        background : theme.palette.secondary.main,
        color: 'white',
        '& svg': {
            color: 'white'
        },
    }
}))

export default function HeaderTopChip({ title, variant, handleClick, ...other }) {
    const classes = useStyles();

    if (variant == 'secondary') {
        return (
            <Chip
                {...other}
                deleteIcon={<KeyboardArrowDownOutlinedIcon color='primary' />}
                onClick={handleClick}
                label={title}
                onDelete={handleClick}
                className={classes.chipSecondary}
            />
        )
    }

    return (
        <Chip
            {...other}
            deleteIcon={<KeyboardArrowDownOutlinedIcon color='primary' />}
            onClick={handleClick}
            label={title}
            onDelete={handleClick}
            className={classes.chip}
        />
    )



}