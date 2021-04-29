import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import GetAvatarUrl from '../../helper/AvatarHelper';
import Link from 'next/link';
export default function UserSearchItem(user) {
    const secondaryTxt = user.isFollowing ? "دنبالش می‌کنید" : `${user.numberOfFollowers} دنبال کننده`
    return (
        <Link href={`/profile/${user.userName}`}>
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