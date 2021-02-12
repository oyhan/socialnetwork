import { makeStyles } from '@material-ui/core';
import { Map, Marker, Overlay } from 'pigeon-maps'
import { useEffect, useState } from 'react';


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

    useEffect(()=>{
        setWidth(window.innerWidth-12);
    })
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

            </Map>
        </div>

    )

} 