import { CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';
import cookieCutter from 'cookie-cutter';
import { useEffect, useState } from 'react';
import { Link,useLocation } from 'react-router-dom'
import CityPageAppBar from '../../components/CityPage/CityPageAppBar';
import useHomeCity from '../../components/CityPage/useHomeCity';
import HomePosts from '../../components/Home/HomePosts';
import HorizontalSlider from '../../components/Slider/HorizontalSlider/HorizontalSlider';
import SliderItem from '../../components/Slider/SliderItem/SliderItem';
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
        margin: '5px 10px',
        cursor: 'pointer'
    }
}))

export default function WhatsNearMe() {

    const position = useGps();
    const classes = useStyles();
    const location = useLocation();
    console.log('location: ', location);
    const [loadingcityHomeData, cityHomeData, errors] = useHomeCity(location.state && location.state.nearby);
    
    const [loading, timeLine, error] = useHttpClient(`/Timeline/Get?lat=${position.latitude}&lon=${position.longitude}`, "Get");

    

    const [cardPosts, setCardPosts] = useState([]);

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


    }, [timeLine])
    const [{ user }, dispatch] = useStateValue();
    // const position = useLocation();
    const getUser = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        return user;
    }

    // useEffect(()=>{
    //   
    // })
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

            <Link to={{ state: cardPosts, pathname: "/nearme" }}>
                <div className={classes.mapSymbole}>

                </div>
            </Link>

            {loading ? <CircularProgress /> :
                <>
                    <Grid justify='space-between' direction='row' spacing={0} container className={classes.title} >
                        <Typography component='h4'>
                             نزدیکترین کافه ها و رستوران‌ها {cityHomeData.name}
              </Typography>
                        <Link to="/nearme" >
                            <a>
                                <Typography color='primary'>
                                    همه را ببین
                          </Typography>
                            </a>
                        </Link>
                    </Grid>
                    <HorizontalSlider Component={SliderItem} items={cardPosts} />
                </>}
            {/* <HomeMap points={cardPosts.map(p => p.latLon)} /> */}


            {loading ? <CircularProgress /> :
                <>
                    <Grid justify='space-between' direction='row' spacing={0} container className={classes.title} >
                        <Typography component='h4'>
                            رستوران‌های برتر {cityHomeData.name}
                        </Typography>
                        <Link to="/nearme" >
                            <a>
                                <Typography color='primary'>
                                    همه را ببین
                          </Typography>
                            </a>
                        </Link>
                    </Grid>
                    <HorizontalSlider Component={SliderItem} items={cardPosts} />
                </>}




        </>
    )
}

