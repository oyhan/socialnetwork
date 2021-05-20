import React from 'react';
import { useParams } from 'react-router-dom';
import PlacePage from '../../components/Place/PlacePage';
import { useHttpClient } from '../../lib/BrowserHttpClient';
import  userLocation from '../../lib/hooks/location/useLocation';

export default function Place() {
    const {placeId} = useParams();
    
    const userPosition = userLocation();
    
    const [loading , placeDetail , error] = useHttpClient(`/restaurant/${placeId}/${userPosition.latitude}/${userPosition.longitude}`,"Get",r=>r.response);

    return (
        <PlacePage placeDetail={placeDetail} placeId={placeId} />
    )

}

