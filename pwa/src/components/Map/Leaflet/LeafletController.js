import 'leaflet.locatecontrol/dist/L.Control.Locate.css';
import "leaflet.locatecontrol/dist/L.Control.Locate.min.js";
import L from 'leaflet'
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import useLocation from '../../../lib/hooks/location/useLocation';

export default function LeafletMapController() {
    const position = useLocation(); 

    const map = useMap();
    useEffect(() => {
        // L.control.locate({})
        // map.hasLayer()
        L.circleMarker([position.latitude,position.longitude]).addTo(map);
        // map.flyTo([position.latitude,position.longitude]);
    },[position.latitude,position.longitude])
    return null;
} 