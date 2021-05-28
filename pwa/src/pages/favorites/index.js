import { CircularProgress } from '@material-ui/core';
import React from 'react';
import AppBar from '../../components/AppBar/AppBar';
import FavoriteItem from '../../components/Favorite/FavoriteItem/FavoriteItem';
import VerticalSlider from '../../components/Slider/VerticalSlider/VerticalSlider';
import { useHttpClient } from '../../lib/BrowserHttpClient';

// const useStyle = makeStyles((theme) => ({
//     text: {
//         color: theme.palette.primary.main
//     }
// }))

export default function Favorites() {

    const [loading, data, error] = useHttpClient(`/Place/Favorites`, "Get", r => r.response)

    return <>
        <AppBar short back title="علاقه‌مندی ها" />

        {loading ? <CircularProgress /> :
            <VerticalSlider items={data} Component={FavoriteItem} />
        }

    </>
}

