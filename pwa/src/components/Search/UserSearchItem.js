import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyle = makeStyles({
    avatar :{
      
    }
})

export default function UserSearchItem(user) {
    const classes  = useStyle();
    const secondaryTxt = user.isFollowing ? "دنبالش می‌کنید" : `${user.numberOfFollowers} دنبال کننده`
    return (
        <Link to={`/profile/${user.userName}`}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar className={classes.avatar} src={user.avatarUrl}/>
                       
                </ListItemAvatar>
                <ListItemText
                    primary={user.displayName || user.userName}
                    secondary={`${secondaryTxt} . @${user.userName}`}
                />
            </ListItem>
        </Link>
    )
}