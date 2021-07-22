import * as React from 'react';
import LeafletMap from "./Leaflet/LeafletMap";
export const MapContext = React.createContext(null);

const MapDataProvider = ({ data, children }) =>
    <MapContext.Provider value={data}>
        {children}
    </MapContext.Provider>

export default function Map({ points, point, enableMyLocation ,...options}) {

    const [viewport, setViewport] = React.useState({
        latitude: 31.834989,
        longitude: 54.374296,
        zoom: 15
    });

    return (
        // <MapDataProvider data={points}>

        <LeafletMap {...options} enableMyLocation={enableMyLocation} points={points} point={point} />



        // </MapDataProvider>
    )
    // return (
    //     <ReactMapGL

    //         mapboxApiAccessToken='pk.eyJ1IjoicmFoaWdoaSIsImEiOiJja2tyenRlNGoza2p0MnZxdGp2NzN6aHc5In0.wSXSuQPILYXcH1E_sfPuvA
    // '
    //         {...viewport}
    //         width="100%"
    //         height="100%"
    //         onViewportChange={(viewport) => setViewport(viewport)}
    //     />
    // );
}