import { Grid, IconButton, Typography } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { useState } from "react";
import AppBar from "../../components/AppBar/AppBar";
import TwoButtons from "../../components/Button/TwoButtons";
import ThinDivider from "../../components/Dividers/ThinDevider";
import FavoriteItem from "../../components/Favorite/FavoriteItem/FavoriteItem";
import HeaderTopChip from "../../components/Header/HeaderTopChip";
import SearchBobo from "../../components/Home/SearchBobo";
import SliderItem1 from "../../components/Slider/SliderItem/SliderItem1";
import VerticalSlider from "../../components/Slider/VerticalSlider/VerticalSlider";
import { AppLoader } from "../../infrastructure/LayoutSelector";
import { useHttpClient } from "../../lib/BrowserHttpClient";


export default function SeeAllClose() {
    const [openSeachBobo, setOpenSeachBobo] = useState(false);

    const [loading, nearRestaurants, error] = useHttpClient("/restaurant/nearme", "Get", r => r.response);

    const handleOpenSearchBobo = () => {
        setOpenSeachBobo(true);
    }

    const leftIcons = [<IconButton onClick={handleOpenSearchBobo} aria-label="search" edge='start' color="inherit">
        <SearchIcon />
    </IconButton>]

    return (
        <>
            <AppBar back leftIcons={leftIcons} short title={<HeaderTopChip variant='secondary' handleClick={() => { }} title="نزدیک" />} />
            <Typography>
                رستوران ها
            </Typography>
            <ThinDivider />
            {
                loading ? <AppLoader /> : <VerticalSlider items={nearRestaurants} Component={SliderItem1} />
            }
            <Grid container justify='center'>
                <TwoButtons />
            </Grid>

            <SearchBobo open={openSeachBobo} handleWindow={setOpenSeachBobo} />

        </>
    )

}