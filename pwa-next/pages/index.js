import Head from 'next/head'
import { useEffect } from 'react';
import AppBar from '../components/AppBar/AppBar';
import HomeAppBar from '../components/Home/HomeAppBar'
import { useStateValue } from '../lib/store/appState'
import styles from '../styles/Home.module.css'
import bg from '../components/Home/background.jpg';
import { Grid, Typography } from '@material-ui/core';
import HorizontalSlider from '../components/Slider/HorizontalSlider/HorizontalSlider';
import HomeMap from '../components/Map/HomeMap';
import HomePosts from '../components/Home/HomePosts';


const closestRestaurants = [
  {
    image: '/coffeeshop1.jpg',
    title: "کافه ناردون",
    rate: 3.5,
    ratesCount: 150,
    distance: 13,
    favorite: true
  },
  {
    image: '/coffeeshop2.jpg',
    title: "کافه ناردون",
    rate: 4.5,
    ratesCount: 150,
    distance: 13,
    favorite: true
  },
  {
    image: '/coffeeshop1.jpg',
    title: "کافه ناردون",
    rate: 10,
    ratesCount: 150,
    distance: 13,
    favorite: true
  },
  {
    image: '/coffeeshop2.jpg',
    title: "کافه ناردون",
    rate: 10,
    ratesCount: 150,
    distance: 13,
    favorite: true
  },
  {
    image: '/coffeeshop1.jpg',
    title: "کافه ناردون",
    rate: 10,
    ratesCount: 150,
    distance: 13,
    favorite: true
  },
  {
    image: '/coffeeshop2.jpg',
    title: "کافه ناردون",
    rate: 10,
    ratesCount: 150,
    distance: 13,
    favorite: true
  },
  {
    image: '/coffeeshop1.jpg',
    title: "کافه ناردون",
    rate: 3.5,
    ratesCount: 150,
    distance: 13,
    favorite: true
  },
  {
    image: '/coffeeshop2.jpg',
    title: "کافه ناردون",
    rate: 4.5,
    ratesCount: 150,
    distance: 13,
    favorite: true
  },
  {
    image: '/coffeeshop1.jpg',
    title: "کافه ناردون",
    rate: 10,
    ratesCount: 150,
    distance: 13,
    favorite: true
  },
  {
    image: '/coffeeshop2.jpg',
    title: "کافه ناردون",
    rate: 10,
    ratesCount: 150,
    distance: 13,
    favorite: true
  },
  {
    image: '/coffeeshop1.jpg',
    title: "کافه ناردون",
    rate: 10,
    ratesCount: 150,
    distance: 13,
    favorite: true
  },
  {
    image: '/coffeeshop2.jpg',
    title: "کافه ناردون",
    rate: 10,
    ratesCount: 150,
    distance: 13,
    favorite: true
  },
]

export default function Home() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    dispatch(<HomeAppBar />);
    return () => {
      dispatch(<AppBar />);
    }
  }, [])

  return (
    <>
      <Head>
        <title>خانه</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HorizontalSlider title="نزدیک‌ترین کافه‌ها و رستوران‌ها" items={closestRestaurants} />
      <HomeMap />
      <HorizontalSlider title="رستوران‌های برتر یزد" items={closestRestaurants} />

      <HomePosts />



    </>
  )
}
