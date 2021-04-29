import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';

export default function RestaurantSearchItem(place) {

    return (
        <Link href={`/place/${place.id}`}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <RestaurantOutlinedIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={place.name}
                />
            </ListItem>
        </Link>
    )
}