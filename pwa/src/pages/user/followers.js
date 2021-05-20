import React from 'react';
import { useParams } from 'react-router-dom';
import AppBar from '../../components/AppBar/AppBar';
import FollowerItem from '../../components/Follower/FollowerItem';
import VerticalSlider from '../../components/Slider/VerticalSlider/VerticalSlider';
import { useHttpClient } from '../../infrastructure/HttpClient';



export default function Followers() {
    const {userName } = useParams();

    const [loading , followers , error] = useHttpClient(`/${userName}/followers`,r=>r.response);

    return <>
        <AppBar title="دنبال کنندگان" />
        <VerticalSlider items={followers} Component={FollowerItem} />
    </>
}