import React from 'react';
import { Typography, makeStyles, CircularProgress, Grid } from '@material-ui/core';
import { useHttpClient } from '../../lib/BrowserHttpClient';
import FavoriteItem from '../../components/Favorite/FavoriteItem/FavoriteItem';
import VerticalSlider from '../../components/Slider/VerticalSlider/VerticalSlider';
import AppBar from '../../components/AppBar/AppBar';
import { Search } from '@material-ui/icons';

const useStyle = makeStyles((theme) => ({
    text: {
        color: theme.palette.primary.main
    }
}))

export default function Favorites() {

    const [loading, data, error] = useHttpClient(`http://localhost:12089/Place/Favorites`, "Get", r => r.response)

    return <>
        <AppBar back title="علاقه‌مندی ها" />
        <Grid container>
            {loading ? <CircularProgress /> :
                <VerticalSlider items={data} Component={FavoriteItem} />
            }
        </Grid>
    </>
}

