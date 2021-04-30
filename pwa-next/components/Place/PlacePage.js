import React from 'react';
import FullWidthTabs from "../Navigation/Tab/FullWidthTab";
import PlaceOverview from "./PlaceOverview";
import usePlacePageStyles from './PlacePage.css';
import PlacePageAppBar from "./PlacePageAppBar";
import PlacePhotos from "./PlacePhotos";
import PlaceReviews from "./PlaceReviews";



export default function PlacePage({ placeDetail, placeId }) {
    const classes = usePlacePageStyles();

   


    return (
        <>
            <PlacePageAppBar />
            <FullWidthTabs tabs={['overview', 'عکس ها', 'نظرات']}
                tabsContent={[<PlaceOverview {...placeDetail} />, <PlacePhotos placeId={placeId} />, <PlaceReviews placeId={placeId} restaurantDetail={placeDetail} />]} />
        </>
    )

}

