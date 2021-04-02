import ButtonBobo from "./ButtonBobo";
import React from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


export default function FollowButton(props) {
    return (
        <ButtonBobo {...props} variant="contained" color="primary">
            دنبال کردن
            <PersonAddIcon />
        </ButtonBobo>
    )
}