import { CircularProgress, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import AppBar from '../../components/AppBar/AppBar';
import FavoriteItem from '../../components/Favorite/FavoriteItem/FavoriteItem';
import SearchBobo from '../../components/Home/SearchBobo';
import VerticalSlider from '../../components/Slider/VerticalSlider/VerticalSlider';
import { useHttpClient } from '../../lib/BrowserHttpClient';
import SearchIcon from '@material-ui/icons/Search';

// const useStyle = makeStyles((theme) => ({
//     text: {
//         color: theme.palette.primary.main
//     }
// }))

export default function Favorites() {

    const [openSeachBobo, setOpenSeachBobo] = useState(false);
    const [loading, data, error] = useHttpClient(`/Place/Favorites`, "Get", r => r.response)
    const handleOpenSearchBobo = () => {
        setOpenSeachBobo(true);
    }

    const leftIcons = [<IconButton onClick={handleOpenSearchBobo} aria-label="search" edge='start' color="inherit">
        <SearchIcon />
    </IconButton>]
    return <>
        <AppBar back leftIcons={leftIcons} rightIcon={<div></div>} short  title="مورد علاقه ها" />

        {loading ? <CircularProgress /> :
            <VerticalSlider items={data} Component={FavoriteItem} />
        }
        <SearchBobo open={openSeachBobo} handleWindow={setOpenSeachBobo} />


    </>
}

