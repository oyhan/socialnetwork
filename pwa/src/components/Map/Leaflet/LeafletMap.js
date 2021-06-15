import { makeStyles } from '@material-ui/core';
import "leaflet-defaulticon-compatibility";
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import 'leaflet/dist/leaflet.css';
import React, { useContext } from 'react';
import { FeatureGroup, MapContainer, Marker, TileLayer } from 'react-leaflet';
import useLocation from '../../../lib/hooks/location/useLocation';
import { useStateValue } from '../../../lib/store/appState';
import { MapContext } from '../Map';
import LeafletMapController from './LeafletController';
const L = require("leaflet");
const useStyle = makeStyles({
    mapContainer: {
        height: '100%',
        width: '100%'
    }
})

var myIcon = L.icon({
    iconUrl: '/map/marker.png',
    iconSize: [30, 40],
    iconAnchor: [16, 43],
    popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    shadowSize: [50, 64],
    shadowAnchor: [22, 94]
});
export default function LeafletMap({ points, point, enableMyLocation }) {


    // var points = useContext(MapContext);

    const [{ user }, dispatch] = useStateValue();
    const position = useLocation();

    const classes = useStyle();

    const userLocation = () => {
        return user.position ? [user.position?.latitude, user.position?.longitude] :
            [31.834989, 54.374296]
    }

    return (
        <MapContainer zoomControl={false} className={classes.mapContainer} center={JSON.parse(point)} zoom={13}>
            <TileLayer
                // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                maxZoom={20}
            />
            {/* <Marker position={[31.834989, 54.374296]}></Marker> */}
            {
                points && points.map((p, i) => {


                    return (<Marker key={i} icon={myIcon} position={JSON.parse(p)}></Marker>)

                }
                )
            }
            <LeafletMapController enableMyLocation={enableMyLocation} />
            <FeatureGroup>

            </FeatureGroup>

        </MapContainer>
    )
}