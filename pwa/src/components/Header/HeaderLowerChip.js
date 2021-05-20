import { Chip, makeStyles } from '@material-ui/core';
import NearMeIcon from '@material-ui/icons/NearMe';
import React from 'react';
import { useScrollData } from 'scroll-data-hook';


export default function HeaderLowerChip({ title, handleClick, ...other }) {
    var { position, direction } = useScrollData();

    const useStyles = makeStyles((theme) => ({

        chip: {
            alignSelf: 'center',
            marginTop: 6,
            background: '#00000094',
            color: 'white',
            fontSize:10,
            borderRadius: 8,
            display :200-position.y<=70? 'none' :'',
        },
        chipIcon: {
            color: 'white',
            fontSize : 15
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
    const classes = useStyles();
    return (
        <Chip
            {...other}
            icon={<NearMeIcon fontSize='small' />}
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