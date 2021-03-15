import React, { Component, useEffect } from "react";
import Locate from "leaflet.locatecontrol";
import { useMap } from "react-leaflet";
import dynamic from 'next/dynamic'



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

