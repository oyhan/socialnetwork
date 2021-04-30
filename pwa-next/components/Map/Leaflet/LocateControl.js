import Locate from "leaflet.locatecontrol";
import { useEffect } from "react";
import { useMap } from "react-leaflet";



export default function LocateControl() {
    const map = useMap();

    useEffect(()=>{
        const lc = new Locate({setView : true});

        lc.addTo(map);

        if (true) {
            // request location update and set location
            lc.start();
        }

    })
    return null;
}

