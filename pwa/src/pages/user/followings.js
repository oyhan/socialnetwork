import React from 'react';
import AppBar from '../../components/AppBar/AppBar';
import ToolbarBackButton from '../../components/Button/ToolbarBackButton';
import FollowerItem from '../../components/Follower/FollowerItem';
import VerticalSlider from '../../components/Slider/VerticalSlider/VerticalSlider';
import { useHttpClient } from '../../infrastructure/HttpClient';
import { useParams } from 'react-router-dom';



export default function Followings() {
    const {userName } = useParams();
    const [loading , followings , error] = useHttpClient(`/${userName}/followings`,r=>r.response);

    return <>
        <AppBar title="دنبال شوندگان" rightIcon={<ToolbarBackButton/>} />
        <VerticalSlider items={followings} Component={FollowerItem} />
    </>
}
