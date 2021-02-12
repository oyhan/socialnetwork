import ButtonBobo from "./ButtonBobo";
import React from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


export default function FollowerButton() {
    return (
        <ButtonBobo variant="contained" color="primary">
            دنبال شونده
            <PersonAddIcon />
        </ButtonBobo>
    )
}