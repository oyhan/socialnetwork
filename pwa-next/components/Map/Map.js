import * as React from 'react';
import PigeonMap from './PigeonMap';
import dynamic from 'next/dynamic'
import { classnames } from '@material-ui/data-grid';
export const MapContext = React.createContext(null);
const MapDataProvider = ({ data, children }) =>
    <MapContext.Provider value={data}>
        {children}
    </MapContext.Provider>

export default function Map({ points }) {
    const [viewport, setViewport] = React.useState({
        latitude: 31.834989,
        longitude: 54.374296,
        zoom: 15
    });
    const LeafletMap = dynamic(
        () => import('./Leaflet/LeafletMap'), // replace '@components/map' with your component's location
        { ssr: false } // This line is important. It's what prevents server-side render
    )
    return (
        <MapDataProvider data={points}>
            <LeafletMap />
        </MapDataProvider>
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