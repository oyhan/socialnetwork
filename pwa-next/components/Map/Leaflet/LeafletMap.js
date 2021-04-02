import { makeStyles } from '@material-ui/core';
import React, { PureComponent, useState, useEffect, useContext } from 'react'
import { TileLayer, Popup, Marker, MapContainer, FeatureGroup, useMap } from 'react-leaflet';
import LocateControl from './LocateControl';
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import LeafletMapController from './LeafletController';
import { MapContext } from '../Map';
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
export default function LeafletMap() {
    var points = useContext(MapContext);

    const classes = useStyle();
    return (
        <MapContainer zoomControl={false} className={classes.mapContainer} center={[31.834989, 54.374296]} zoom={15}>
            <TileLayer
                // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            maxZoom={20}
            />
            {/* <Marker position={[31.834989, 54.374296]}></Marker> */}
            {
                points.map((p,i) => {


                    return (<Marker key={i} icon={myIcon} position={JSON.parse(p)}></Marker>)

                }
                )
            }
            {/* <LocateControl /> */}
            <LeafletMapController />
            <FeatureGroup>

            </FeatureGroup>

        </MapContainer>
    )
}