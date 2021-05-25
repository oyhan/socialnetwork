import React from 'react';
import AppBar from '../../components/AppBar/AppBar';
import ToolbarBackButton from '../../components/Button/ToolbarBackButton';
import FollowerItem from '../../components/Follower/FollowerItem';
import VerticalSlider from '../../components/Slider/VerticalSlider/VerticalSlider';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../lib/BrowserHttpClient';



export default function Followings() {
    const {userName } = useParams();
    const [loading , followings , error] = useHttpClient(`/${userName}/followings`,"Get",r=>r.response);

    return <>
        <AppBar title="دنبال شوندگان" rightIcon={<ToolbarBackButton/>} />
        <VerticalSlider items={followings} Component={FollowerItem} />
    </>
}
