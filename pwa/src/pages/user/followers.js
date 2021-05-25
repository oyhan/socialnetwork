import React from 'react';
import { useParams } from 'react-router-dom';
import AppBar from '../../components/AppBar/AppBar';
import ToolbarBackButton from '../../components/Button/ToolbarBackButton';
import FollowerItem from '../../components/Follower/FollowerItem';
import VerticalSlider from '../../components/Slider/VerticalSlider/VerticalSlider';
import { useHttpClient } from '../../lib/BrowserHttpClient';



export default function Followers() {
    const {userName } = useParams();

    const [loading , followers , error] = useHttpClient(`/${userName}/followers`,"Get",r=>r.response);

    return <>
        <AppBar title="دنبال کنندگان"  rightIcon={<ToolbarBackButton/>}/>
        <VerticalSlider items={followers} Component={FollowerItem} />
    </>
}