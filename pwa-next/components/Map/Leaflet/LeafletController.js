import { FeatureGroup } from 'leaflet';
import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet';
var parse = require('wellknown');
export default function LeafletMapController() {

    const map = useMap();
    useEffect(() => {
       const feature=  parse('POINT(31.834989 54.374296)');
       
        var geojsonLayer = L.geoJson(feature);
        map.addLayer(geojsonLayer);
    },[])
    return null;
} 