import React from 'react';
import FullWidthTabs from "../Navigation/Tab/FullWidthTab";
import ScrollSpyTabs from '../Navigation/Tab/ScrollSpyTabs';
import PlaceOverview from "./PlaceOverview";
import usePlacePageStyles from './PlacePage.css';
import PlacePageAppBar from "./PlacePageAppBar";
import PlacePhotos from "./PlacePhotos";
import PlaceReviews from "./PlaceReviews";



export default function PlacePage({ placeDetail, placeId, photos, loadingPhotos }) {


    const classes = usePlacePageStyles();

    return (
        <>
            <PlacePageAppBar photos={photos} />
            <ScrollSpyTabs
                offset={140}
                tabsInScroll={[
                    {
                        text: "overview",
                        component: <PlaceOverview {...placeDetail} />
                    },

                    {
                        text: "عکس ها",
                        component: <PlacePhotos place={placeDetail} photos={photos} loadingPhotos={loadingPhotos} placeId={placeId} />
                    },
                    {
                        text: "نظرات",
                        component: <PlaceReviews placeId={placeId} restaurantDetail={placeDetail} />
                    },

                ]}
            />
            {/* <FullWidthTabs tabs={['overview', 'عکس ها', 'نظرات']} */}
            {/* tabsContent={[<PlaceOverview {...placeDetail} />, <PlacePhotos place={placeDetail} placeId={placeId} />, <PlaceReviews placeId={placeId} restaurantDetail={placeDetail} />]} /> */}
        </>
    )

}

