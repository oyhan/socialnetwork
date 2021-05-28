import React from 'react';
import { useParams } from 'react-router-dom';
import AppBar from '../../components/AppBar/AppBar';
import FollowerItem from '../../components/Follower/FollowerItem';
import VerticalSlider from '../../components/Slider/VerticalSlider/VerticalSlider';
import { useHttpClient } from '../../lib/BrowserHttpClient';



export default function Followings() {
    const { userName } = useParams();
    const [loading, followings, error] = useHttpClient(`/${userName}/followings`, "Get", r => r.response);

    return <>
        <AppBar short title="دنبال شوندگان" back />
        <VerticalSlider items={followings} Component={FollowerItem} />
    </>
}
