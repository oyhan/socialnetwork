import React from 'react';
import AppBar from '../../components/AppBar/AppBar';
import FollowerItem from '../../components/Follower/FollowerItem';
import VerticalSlider from '../../components/Slider/VerticalSlider/VerticalSlider';
import httpClientBuilder from '../../lib/HttpClient';



export default function Followers({ followers }) {

    return <>
        <AppBar title="دنبال کنندگان" />
        <VerticalSlider items={followers} Component={FollowerItem} />
    </>
}

export async function getServerSideProps(context) {

    const userName = context.params.userName;
    
    
    

    var httpClient = httpClientBuilder(context);
    var result = await httpClient.Get(`/${userName}/followers`);
    
    
    return {
        props: {
            followers: result.response,
        }
    }

}