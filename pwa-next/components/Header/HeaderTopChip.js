import { Chip, makeStyles } from '@material-ui/core';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import React from 'react';


const useStyles = makeStyles((theme) => ({

    chip: {
        alignSelf: 'center',
        '& svg': {
            color: theme.palette.primary.main
        }
      
    },
}))

export default function HeaderTopChip({title , handleClick,...other}) {
    const classes = useStyles();
    return (
        <Chip
            {...other}
            icon={<KeyboardArrowDownOutlinedIcon  color='primary' />}
            onClick={handleClick}
            label={title}
            className={classes.chip}
        />
    )

}