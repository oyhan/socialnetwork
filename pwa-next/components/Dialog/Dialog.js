import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles({
    list: {
        width: 250,
        direction: 'ltr'
    },
    fullList: {
        width: 'auto',
    },
});

export default function Dialog({ open, items, handleClose }) {
    const classes = useStyles();

    const onclose = () => {
        handleClose()
    }


    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {items.map((item, index) => (
                    item.visible ? <ListItem button onClick={item.action} key={index}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItem> : ""
                ))}
            </List>
            <Divider />
            <List>
                <ListItem button onClick={handleClose} >
                    <ListItemIcon>
                        <CancelIcon />
                    </ListItemIcon>
                    <ListItemText primary="بستن" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <Drawer anchor='bottom' open={open} onClose={onclose}>
                {list('bottom')}
            </Drawer>
        </div>
    );
}
