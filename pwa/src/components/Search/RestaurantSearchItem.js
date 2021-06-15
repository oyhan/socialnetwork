import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import { Link } from 'react-router-dom';
import React from 'react';

export default function RestaurantSearchItem({ place, handleClick }) {

    return (
        handleClick ? <ListItem button onClick={handleClick(place)}>
            <ListItemAvatar>
                <Avatar>
                    <RestaurantOutlinedIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={place.name}
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