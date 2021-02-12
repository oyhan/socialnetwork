import { Chip, makeStyles } from '@material-ui/core';
import React from 'react'
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';


const useStyles = makeStyles((theme) => ({

    chip: {
        alignSelf: 'center',
        '& svg': {
            color: theme.palette.primary.main
        }
      
    },
}))

export default function HeaderTopChip({title , handleClick}) {
    const classes = useStyles();
    return (
        <Chip
            icon={<KeyboardArrowDownOutlinedIcon  color='primary' />}
            onClick={handleClick}
            label={title}
            className={classes.chip}
        />
    )

}