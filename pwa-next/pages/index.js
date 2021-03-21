import Head from 'next/head'
import { useEffect } from 'react';
import AppBar from '../components/AppBar/AppBar';
import HomeAppBar from '../components/Home/HomeAppBar'
import { useStateValue } from '../lib/store/appState'
import styles from '../styles/Home.module.css'
import { Grid, Typography } from '@material-ui/core';
import HorizontalSlider from '../components/Slider/HorizontalSlider/HorizontalSlider';
import HomeMap from '../components/Map/HomeMap';
import HomePosts from '../components/Home/HomePosts';

import useLocation from '../lib/hooks/location/useLocation';
import { getCookieParser } from 'next/dist/next-server/server/api-utils';
import { env } from 'process';
import { actions } from '../lib/reducer/actions';
import Cookies from 'cookies'
import httpClientBuilder from '../lib/HttpClient';
import UserManagerBuilder from '../lib/userManager';





export default function Home({ data, posts }) {
  console.log('posts: ', posts);
  

  const [{ user }, dispatch] = useStateValue();
  const position = useLocation();
  const getUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  }


  useEffect(() => {

    if (position)
      document.cookie = `position=lat=${position.latitude}&lon=${position.longitude}`;
    dispatch({ type: actions.USER, payload: { ...user, location: position } });
  }, [position])

  useEffect(() => {
    // dispatch({ type: actions.APPBAR, payload: <HomeAppBar /> });
    var user = getUser();

    dispatch({ type: actions.USER, payload: { ...user, isAuthenticated: true, location: "" } })

    return () => {
      dispatch({ type: actions.APPBAR, payload: <AppBar /> });
    }
  }, [])

  return (
    <>
      <HomeAppBar />
      <Head>
        <title>خانه</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="stylesheet" href="leaflet/dist/leaflet.css" /> */}
      </Head>
      <HorizontalSlider title="نزدیک‌ترین کافه‌ها و رستوران‌ها" items={data} />
      <HomeMap points={data.map(p => p.latLon)} />
      <HorizontalSlider title="رستوران‌های برتر یزد" items={data} />

      <HomePosts posts={posts} />



    </>
  )
}

export async function getServerSideProps(context) {
  var httpClient = httpClientBuilder(context);

  var cookies = getCookieParser(context.req)();

  const { req, res } = context;
  const userManager = UserManagerBuilder(context);
  const user = userManager.Load(cookies);
  

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  var userPosition = getCookieParser(context.req)().position;


  if (process.env.NODE_ENV === "development") {
    userPosition = "lat=31.890638&lon=54.354945";

  }
  
  
  var timeLine = await httpClient.Get(`http://localhost:12089/Timeline/Get?${userPosition}`);
  console.log('timeLine: ', timeLine);

  // var posts = await httpClient.Get(`http://localhost:12089/Timeline/GetUserTimelinePosts?from=0&to=10`);


  var cardPosts = timeLine.closestRestaurants.map(p => ({
    image: '/coffeeshop2.jpg',
    title: p.name,
    rate: p.rate,
    ratesCount: p.noOfReviews,
    distance: p.distanceString,
    favorite: p.favorite,
    latLon: p.latLon
  }))
  return {
    props: { data: cardPosts, posts : timeLine.followingsPosts }, // will be passed to the page component as props
  }
}