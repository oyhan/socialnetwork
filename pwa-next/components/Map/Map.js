import * as React from 'react';
import PigeonMap from './PigeonMap';

export default function Map() {
    const [viewport, setViewport] = React.useState({
        latitude: 31.834989,
        longitude: 54.374296,
        zoom: 15
    });
    return(
        <PigeonMap />
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