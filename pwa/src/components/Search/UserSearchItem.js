import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import {Link} from 'react-router-dom';
import React from 'react';
import GetAvatarUrl from '../../helper/AvatarHelper';
export default function UserSearchItem(user) {
    const secondaryTxt = user.isFollowing ? "دنبالش می‌کنید" : `${user.numberOfFollowers} دنبال کننده`
    return (
        <Link to={`/profile/${user.userName}`}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar src={GetAvatarUrl(user.userName)}>
                        <AccountCircleRoundedIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={user.displayName || user.userName}
                    secondary={`${secondaryTxt} . @${user.userName}`}
                />
            </ListItem>
        </Link>
    )
}