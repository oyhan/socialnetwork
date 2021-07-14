// import 'leaflet.locatecontrol/dist/L.Control.Locate.css';
import L from 'leaflet'
import "leaflet.locatecontrol/dist/L.Control.Locate.min.js";

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import useLocation from '../../../lib/hooks/location/useLocation';

export default function LeafletMapController({ enableMyLocation }) {
    const position = useLocation();

    const map = useMap();
    
    useEffect(() => {
        if (enableMyLocation) {
            const locate = L.control.locate({ flyto: true, position: "bottomright" ,keepCurrentZoomLevel :true })
            if (!locate._map) {
                map.addControl(locate);
                locate.start();
                // map.locate({setView: true, maxZoom: 16});
            }

        }
       
        // map.hasLayer()
        // L.circleMarker([position.latitude, position.longitude]).addTo(map);
        // map.flyTo([position.latitude,position.longitude]);
    }, [])
    return null;
}