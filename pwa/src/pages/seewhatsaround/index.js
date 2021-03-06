import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import cookieCutter from 'cookie-cutter';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CityPageAppBar from '../../components/CityPage/CityPageAppBar';
import useHomeCity from '../../components/CityPage/useHomeCity';
import AppDivider from '../../components/Dividers/AppDivider';
import HomeSection from '../../components/Home/HomeSection';
import { useHttpClient } from '../../lib/BrowserHttpClient';
import useGps from '../../lib/hooks/location/useLocation';
import { actions } from '../../lib/reducer/actions';
import { useStateValue } from '../../lib/store/appState';

const useStyles = makeStyles(theme => ({
    mapSymbole: {
        background: 'url(/mapsymbole.png)',
        borderRadius: 15,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 105,
        margin: '4px 7px 30px 7px',
        cursor: 'pointer'
    }
}))

export default function WhatsNearMe() {

    const position = useGps();
    const classes = useStyles();
    const location = useLocation();
    const [loadingcityHomeData, cityHomeData, errors] = useHomeCity(location.state && location.state.nearby);
    const [loading, timeLine, error] = useHttpClient(`/Timeline/Get?lat=${position.latitude}&lon=${position.longitude}`, "Get");
    const [cardPosts, setCardPosts] = useState([]);
    const [recommandedRests, setRecommandedRests] = useState([]);

    useEffect(() => {

        if (timeLine.closestRestaurants) {

            const restaurants = timeLine.closestRestaurants.map(p => ({

                image: '/coffeeshop2.jpg',
                title: p.name,
                rate: p.rate,
                ratesCount: p.noOfReviews,
                distance: p.distanceString,
                favorite: p.favorite,
                latLon: p.latLon,
                id: p.id
            }));

            setCardPosts(restaurants);
        }

        if (timeLine.recommandedRestaurants) {

            const recrestaurants = timeLine.recommandedRestaurants.map(p => ({

                image: '/coffeeshop2.jpg',
                title: p.name,
                rate: p.rate,
                ratesCount: p.noOfReviews,
                distance: p.distanceString,
                favorite: p.favorite,
                latLon: p.latLon,
                id: p.id
            }));

            setRecommandedRests(recrestaurants);
        }
    }, [timeLine])

    const [{ user }, dispatch] = useStateValue();
    const getUser = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        return user;
    }

    useEffect(() => {

        if (position) {
            cookieCutter.set("latitude", position.latitude);
            cookieCutter.set("longitude", position.longitude);
            document.cookie = `position=lat=${position.latitude}&lon=${position.longitude}`;
        }
        dispatch({ type: actions.USER, payload: { ...user, location: position } });
    }, [position.latitude])

    useEffect(() => {
        // dispatch({ type: actions.APPBAR, payload: <HomeAppBar /> });
        var user = getUser();

        dispatch({ type: actions.USER, payload: { ...user, isAuthenticated: true, location: "" } })
    }, [])

    return (
        <>
            {!loadingcityHomeData && <CityPageAppBar nearby={location.state?.nearby} {...cityHomeData} />}

            <Box m='-2px 7px 19px 7px'>
                <Grid container>
                    <Typography className='s19'>
                        ???????? ?????? ?????????? ???? ?????????? ????????
                    </Typography>
                </Grid>
            </Box>

            <Link to={{ state: cardPosts, pathname: "/nearme" }}>
                <div className={classes.mapSymbole}>

                </div>
            </Link>

            <AppDivider />
            <Box m='17px 0'>
                <HomeSection loading={loading} items={cardPosts} title={`?????????????????? ???????? ???? ?? ????????????????????? ${cityHomeData.name}`} linkTo='/seeallclose' />
            </Box>
            <AppDivider />
            <Box m='17px 0'>
                <HomeSection loading={loading} items={recommandedRests} title={`??????????????????????? ???????? ${cityHomeData.name}`} linkTo='/seeallbest' />
            </Box>
        </>
    )
}

