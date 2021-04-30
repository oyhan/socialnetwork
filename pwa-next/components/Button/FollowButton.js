import PersonAddIcon from '@material-ui/icons/PersonAdd';
import React from 'react';
import ButtonBobo from "./ButtonBobo";


export default function FollowButton(props) {
    return (
        <ButtonBobo {...props} variant="contained" color="primary">
            دنبال کردن
            <PersonAddIcon />
        </ButtonBobo>
    )
}