import React from 'react';
import AppBar from '../../components/AppBar/AppBar';
import ToolbarBackButton from '../../components/Button/ToolbarBackButton';
import FollowerItem from '../../components/Follower/FollowerItem';
import VerticalSlider from '../../components/Slider/VerticalSlider/VerticalSlider';
import httpClientBuilder from '../../lib/HttpClient';



export default function Followings({ followings }) {
    return <>
        <AppBar title="دنبال شوندگان" rightIcon={<ToolbarBackButton/>} />
        <VerticalSlider items={followings} Component={FollowerItem} />
    </>
}

export async function getServerSideProps(context) {

    const userName = context.params.userName;
    var httpClient = httpClientBuilder(context);
    var result = await httpClient.Get(`/${userName}/followings`);
    
    return {
        props: {
            followings: result.response,
        }
    }

}