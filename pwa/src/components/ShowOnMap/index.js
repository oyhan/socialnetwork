import { IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import FavoriteItem from '../Favorite/FavoriteItem/FavoriteItem';
import Map from '../Map/Map';
import VerticalSlider from '../Slider/VerticalSlider/VerticalSlider';
import "./bottomSheet.css";
import '../../styles/font-awesome.min.css'
import {useHistory} from 'react-router-dom';
const useStyle = makeStyles(theme => ({

    map: {
        height: '45vh',
    },
    closeBtn : {
        position: 'fixed',
        top: 16,
        right: 20,
        zIndex: 1000,
        background: 'white',
        width: 20,
        height: 20,
    }

}))

export default function ShowOnMap({ places }) {
    const history = useHistory();
    
    const points = places.map(p => p.latLon);
    
    const [open, setOpen] = useState(true);
    const classes = useStyle();

    const handleClose = () => {
        history.goBack();
    }; 

    return (
        <>
            <IconButton edge="start" color="primary" onClick={handleClose} className={classes.closeBtn} aria-label="close">
                <CloseIcon />
            </IconButton>
            <div className={classes.map}>
                {points && <Map enableMyLocation points={points} point={points[0]} />}
            </div>
            <BottomSheet
                open={true}
                onDismiss={() => setOpen(false)}
                blocking={false}

                snapPoints={({ maxHeight }) => {
                    
                    return [maxHeight * 0.50]
                }}
            >

                <VerticalSlider items={places} Component={FavoriteItem} componentProps={{iconic : true}} />

            </BottomSheet>

            {/* <SwipeableBottomSheet style={{ borderRadius: "15px" }} bodyStyle={{ borderRadius: "15px" }} overlayStyle={{ borderRadius: "15px" }} overflowHeight={64}>
                <Grid container justify='center'>
                    <div className={classes.handle}></div>
                </Grid>
                <div style={{ height: '500px' }}>
                </div>
            </SwipeableBottomSheet> */}

        </>
    )



}