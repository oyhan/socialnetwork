import ButtonBobo from "./ButtonBobo";
import React from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


export default function FollowerButton(props) {
    return (
        <ButtonBobo {...props} variant="contained" color="primary">
            دنبال شونده
            <PersonAddIcon />
        </ButtonBobo>
    )
}