import { Chip, makeStyles } from '@material-ui/core';
import NearMeIcon from '@material-ui/icons/NearMe';
// import React from 'react';
// import { useScrollData } from 'scroll-data-hook';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

    chip: {
        alignSelf: 'center',
        marginTop: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        color: 'white',
        fontSize:13,
        borderRadius: 5,
        height: 22,
        padding : '4.64px 10px'
        // display :200-position.y<=70? 'none' :'',
    },
    chipIcon: {
        color: 'white',
        fontSize : 15,
        transform: 'scaleX(-1)',

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
export default function HeaderLowerChip({ title, handleClick, ...other }) {
    // var { position, direction } = useScrollData();
    const router = useHistory();

   
    const classes = useStyles();
    const goToWhatsNearMe = ()=>{
        router.push("/seewhatsaround", { nearby: true });

    }
    return (
        <Chip
            // {...other}
            icon={<NearMeIcon fontSize='small' />}
            classes={{
                icon: classes.chipIcon,
                clickable: classes.clickable
            }}
            onClick={goToWhatsNearMe}
            label={title}
            className={classes.chip}
        />
    )

}