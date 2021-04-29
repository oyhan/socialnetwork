import { IconButton } from '@material-ui/core';
import React from 'react';
import AppBar from '../../components/AppBar/AppBar';
import FollowerItem from '../../components/Follower/FollowerItem';
import VerticalSlider from '../../components/Slider/VerticalSlider/VerticalSlider';
import httpClientBuilder from '../../lib/HttpClient';
import { useRouter } from 'next/router';
import ToolbarBackButton from '../../components/Button/ToolbarBackButton';



export default function Followings({ followings }) {
    return <>
        <AppBar title="دنبال شوندگان" rightIcon={<ToolbarBackButton/>} />
        <VerticalSlider items={followings} Component={FollowerItem} />
    </>
}

export async function getServerSideProps(context) {

    const userName = context.params.userName;
    console.log('context.params: ', context.params);
    console.log('userName: ', userName);

    var httpClient = httpClientBuilder(context);
    var result = await httpClient.Get(`http://localhost:12089/${userName}/followings`);
    console.log('result: ', result);
    return {
        props: {
            followings: result.response,
        }
    }

}