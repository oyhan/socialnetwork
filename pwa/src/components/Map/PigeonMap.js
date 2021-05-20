import { makeStyles } from '@material-ui/core';
import { Map, Marker } from 'pigeon-maps';
import { useState } from 'react';
import { useStateValue } from '../../lib/store/appState';


const useStyles = makeStyles((theme) => ({
    map: {
        direction: 'rtl',
        "&>div": {
            width: '100vw',
            height: '150px !important'
        }
    }
}));
export default function PigeonMap() {
    const classes = useStyles();
    const [width, setWidth] = useState(300);
    const [{user},dispatch]= useStateValue();
    
    
    const osm = (x, y, z) => {
        const s = String.fromCharCode(97 + ((x + y + z) % 3))
        return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
    };
    return (
        <div className={classes.map}>
            <Map
                //  defaultWidth={100}


                provider={osm}
                defaultCenter={[31.834989, 54.374296]}
                defaultZoom={12}
                height={150}>
                <Marker
                    anchor={[user.location?.latitude,user.location?.longitude]}
                    color='black'
                    payload={1}
                    hover
                    onClick={({ event, anchor, payload }) => {
                        
                    }}
                />


            </Map>
        </div>

    )

} 