import PersonAddIcon from '@material-ui/icons/PersonAdd';
import React from 'react';
import ButtonBobo from "./ButtonBobo";


export default function FollowerButton(props) {
    return (
        <ButtonBobo {...props} variant="contained" color="primary">
            دنبال شونده
            <PersonAddIcon />
        </ButtonBobo>
    )
}