import { Box, CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';
import cookieCutter from 'cookie-cutter';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeAppBar from '../components/Home/HomeAppBar';
import HomePosts from '../components/Home/HomePosts';
import HorizontalSlider from '../components/Slider/HorizontalSlider/HorizontalSlider';
import SliderItem from '../components/Slider/SliderItem/SliderItem';
import { BrowserHttpClient, useHttpClient } from '../lib/BrowserHttpClient';
import useLocation from '../lib/hooks/location/useLocation';
import { actions } from '../lib/reducer/actions';
import { useStateValue } from '../lib/store/appState';
import AppDivider from '../components/Dividers/AppDivider';
import HomeSection from '../components/Home/HomeSection';

const useStyles = makeStyles(theme => ({
  mapSymbole: {
    background: 'url(/mapsymbole.png)',
    borderRadius: 9,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 105,
    margin: '4px 7px 18px 7px',
    cursor: 'pointer'
  },
  nearestRestaurantTitle: {
    marginBottom: theme.spacing(1),
    marginTop: '30px',
  }
}))

export default function Home() {

  const position = useLocation();
  const classes = useStyles();

  var [loading, timeLine, error] = useHttpClient(`/Timeline/Get?lat=${position.latitude}&lon=${position.longitude}`, "Get");



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
  // const position = useLocation();
  const getUser = () => {
    // var user = BrowserHttpClient.Get("/profile/me").then(result =>{
    //   const profile = result.response;
    //   return profile;
    // })
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
      <HomeAppBar />
      <HomeSection loading={loading} items={cardPosts} title='نزدیکترین کافه ها و رستوران‌ها' linkTo="/seeallclose" className={classes.nearestRestaurantTitle} />
      <AppDivider />

      <Box m='0 7px'>
        <Grid justify='space-between' direction='row' spacing={0}
          container >
          <Box m='12px 0 9px 0'>
            <Typography variant='h6' className='s19'>
              مکان‌های اطراف  را جستجو کنید
        </Typography>
          </Box>
        </Grid>
      </Box>

      <Link to={{ state: cardPosts, pathname: "/nearme" }}>
        <div className={classes.mapSymbole}>

        </div>
      </Link>

      <AppDivider />
      <Box m='13px 10px 27px 10px'>
        <Grid container>
          <Typography className='s19'>
            پیشنهاد شده برای شما
        </Typography>
        </Grid>
      </Box>

      <HomeSection loading={loading} items={recommandedRests} title='رستوران‌های برتر یزد' linkTo="/seeallbest" />
      <AppDivider />

      <HomePosts posts={timeLine.followingsPosts || []} />
    </>
  )
}

