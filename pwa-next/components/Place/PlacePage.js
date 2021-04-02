import { Container, Divider } from "@material-ui/core";
import FullWidthTabs from "../Navigation/Tab/FullWidthTab";
import PlaceOverview from "./PlaceOverview";
import PlacePageAppBar from "./PlacePageAppBar";
import React from 'react';
import HorizontalSlider from "../Slider/HorizontalSlider/HorizontalSlider";
import SquareImage from "../Image/SquareImage";
import usePlacePageStyles from './PlacePage.css';
import PlaceReviews from "./PlaceReviews";
import PlacePhotos from "./PlacePhotos";



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

