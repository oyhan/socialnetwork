import React from 'react';
import PlacePage from '../../components/Place/PlacePage';
import httpClientBuilder from '../../lib/HttpClient';


export default function Place({ placeDetail ,placeId }) {


    return (
        <PlacePage placeDetail={placeDetail} placeId={placeId} />
    )

}

export async function getServerSideProps(context) {
    const placeId = context.params.placeId;
    
    var httpClient = httpClientBuilder(context);

    var result = await httpClient.Get(`http://localhost:12089/restaurant/${placeId}/31.834989/54.374296`);
    
    return {
        props: {
            placeDetail: result.response,
            placeId
        }
    }
    if (result.successFull) {
       
    }

    return {
        redirect: {
            distination: "/"
        }
    }


}