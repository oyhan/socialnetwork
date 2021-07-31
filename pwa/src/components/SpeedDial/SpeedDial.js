import { Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        zIndex: 2000
    },
    exampleWrapper: {
        position: 'fixed',
        bottom: theme.spacing(8),
        right: theme.spacing(3),
        zIndex: 1000

    },
    backdrop: {
        zIndex: 500,
        backgroundColor: 'rgb(0 0 0 / 80%)',
        '-webkit-tap-highlight-color': 'transparent',
    },
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: -9,
            right:-15,
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: -9,
            left:-15,
        },
    },
    fab: {
        width : 53,
        height:53,
        background: 'black',
        "&:hover": {
            background: 'black',
           
        },
        "& svg" : {
            fontSize : '2.3rem'
        }
    },
    action: {
        width : 53,
        height:53,
        background: 'black',
        "& svg ": {
            color: 'white',
           
        }
    },
    icon : {
        height:37
    },
    tooltip : {
        width : 50,
        color : 'white',
        boxShadow : 'unset',
        background: 'unset',
        fontSize : 14,
        padding:'unset',
        width: 90,
        textAlign: 'end',
    }

}));



export default function SpeedDials({ newPostClickHandler }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);
    const ref = useRef();

    const actions = [
        { icon: <EditIcon />, name: 'نوشتن نظر', FabProps: { component: Link, to: "/searchforplace" } },
        { icon: <PhotoCameraIcon />, name: 'پست کردن عکس', htmlFor: "postinput", handleClick: () => { ref.current.click(); } },

    ];

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const inputlClickHandler = (event) => {

        newPostClickHandler && newPostClickHandler(event.target.files);
    }

    return (
        <>
            <Backdrop className={classes.backdrop} open={open} />
            <div className={classes.root}>
                <input accept="image/*" multiple ref={ref} type='file' style={{ display: 'none' }} onChange={inputlClickHandler} id="postinput" />
                <div className={classes.exampleWrapper}>
                    <SpeedDial
                        ariaLabel="SpeedDial example"
                        className={classes.speedDial}
                        hidden={hidden}
                        icon={<SpeedDialIcon className={classes.icon} />}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        openIcon={<EditIcon />}
                        open={open}
                        // open
                        FabProps={{ className: classes.fab }}
                        direction='up'
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                tooltipOpen
                                classes={{staticTooltipLabel:classes.tooltip}}
                                className={classes.action}
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}

                                htmlFor={"postinput"}
                                onClick={action.handleClick}
                                {...action}
                            />
                        ))}
                    </SpeedDial>
                </div>
            </div>
        </>
    );
}
