import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import clsx from 'clsx';
import React from 'react';

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
