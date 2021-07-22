import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import { Link } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme=>({
    root : {
        minWidth : 23
    },
    textPrimary : {

    }
}))
export default function RestaurantSearchItem({ place, handleClick }) {
    const classes= useStyle();
    return (
        handleClick ? <ListItem button onClick={handleClick(place)}>
            <ListItemAvatar classes={{root: classes.root}}>
                    <RestaurantOutlinedIcon fontSize='small' color='primary' />
            </ListItemAvatar>
            <ListItemText 
                        classes={{primary: 'titr15' , secondary : 's10' }}
                        primary={place.name}
                        secondary={"استان یزد، ایران"}
            />
        </ListItem> :
            <Link to={`/place/${place.id}`}>
                <ListItem >
                    <ListItemAvatar>
                        <RestaurantOutlinedIcon color='primary' />
                    </ListItemAvatar>
                    <ListItemText
                        primary={place.name}
                    />
                </ListItem>
            </Link>
    )
}