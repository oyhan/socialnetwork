import React from 'react';
import { useParams } from 'react-router-dom';
import PlacePage from '../../components/Place/PlacePage';
import { useHttpClient } from '../../lib/BrowserHttpClient';
import  userLocation from '../../lib/hooks/location/useLocation';

export default function Place() {
    const {placeId} = useParams();
    
    const userPosition = userLocation();
    
    const [loading , placeDetail , error] = useHttpClient(`/restaurant/${placeId}/${userPosition.latitude}/${userPosition.longitude}`,"Get",r=>r.response);
    const [loadingPhotos, photos, ] = useHttpClient(`/place/photos/${placeId}`, "Get", r => r.response)

    return (
        <PlacePage loadingPhotos={loadingPhotos} placeDetail={placeDetail} photos={photos} placeId={placeId} />
    )

}

