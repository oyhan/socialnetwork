import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { PhotoCamera } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    exampleWrapper: {
        position: 'absolute',
        bottom: theme.spacing(8),
        right: theme.spacing(3),

    },

    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    },
}));



export default function SpeedDials({newPostClickHandler}) {
    const classes = useStyles();
    const [direction, setDirection] = React.useState('up');
    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);
    const ref = useRef();
    const handleDirectionChange = (event) => {
        setDirection(event.target.value);
    };
    const actions = [
        { icon: <EditIcon />, name: 'دیدگاه جدید' },
        { icon: <PhotoCameraIcon />, name: 'پست جدید', htmlFor: "postinput" ,handleClick :()=>{ref.current.click(); console.log('ref.current: ', ref.current);}},
        
    ];
    const handleHiddenChange = (event) => {
        setHidden(event.target.checked);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const inputlClickHandler = (event)=>{

        newPostClickHandler  && newPostClickHandler(event.target.files) ;
    }

    return (
        <div className={classes.root}>
            <input accept="image/*" multiple ref={ref} type='file' style={{ display: 'none' }} onChange={inputlClickHandler} id="postinput" />
            <div className={classes.exampleWrapper}>
                <SpeedDial
                    ariaLabel="SpeedDial example"
                    className={classes.speedDial}
                    hidden={hidden}
                    icon={<SpeedDialIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                    direction={direction}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            htmlFor={"postinput"}
                            onClick={action.handleClick}
                        />
                    ))}
                </SpeedDial>
            </div>
        </div>
    );
}
