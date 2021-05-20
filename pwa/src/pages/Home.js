import cookieCutter from 'cookie-cutter';
import { useEffect, useState } from 'react';
import AppBar from '../components/AppBar/AppBar';
import HomeAppBar from '../components/Home/HomeAppBar';
import HomePosts from '../components/Home/HomePosts';
import HorizontalSlider from '../components/Slider/HorizontalSlider/HorizontalSlider';
import SliderItem from '../components/Slider/SliderItem/SliderItem';
import { useHttpClient } from '../lib/BrowserHttpClient';
import useLocation from '../lib/hooks/location/useLocation';
import { actions } from '../lib/reducer/actions';
import { useStateValue } from '../lib/store/appState';






export default function Home() {

  const position = useLocation();


  var [loading,timeLine,error] = useHttpClient(`/Timeline/Get?lat=${position.latitude}&lon=${position.longitude}`, "Get");



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

    return () => {
      dispatch({ type: actions.APPBAR, payload: <AppBar /> });
    }
  }, [])

  return (
    <>

      <HomeAppBar />

      <HorizontalSlider Component={SliderItem} title="نزدیک‌ترین کافه‌ها و رستوران‌ها" items={cardPosts} />
      {/* <HomeMap points={data.map(p => p.latLon)} /> */}
      <HorizontalSlider Component={SliderItem} title="رستوران‌های برتر یزد" items={cardPosts} />

      <HomePosts posts={timeLine.followingsPosts || []} />



    </>
  )
}

