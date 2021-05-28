import { lazy } from 'react';
import Home from '../pages/Home';
import ConfirmLogin from '../pages/login/confirm';
import NearMe from '../pages/nearme';
import SettingsPage from '../pages/settings';
import ConfirmSignup from '../pages/signup/confirm';

const SearchForPlace = lazy(() => import('../components/Place/SearchForPlace'));
const PlaceSeeAllPhotos = lazy(() => import('../components/Place/PlaceSeeAllPhotos'));
const CityPostsPage = lazy(() => import('../pages/city/cityPosts'));
const PostPage = lazy(() => import('../pages/post'));
const WhatsNearMe = lazy(() => import('../pages/seewhatsaround'));
const Favorites = lazy(() => import('../pages/favorites'));
const Start = lazy(() => import('../pages/start/Start'));
const Login = lazy(() => import('../pages/login'));
const Signup = lazy(() => import('../pages/signup/Signup'));
const Followers = lazy(() => import('../pages/user/followers'));
const Followings = lazy(() => import('../pages/user/followings'));
const Profile = lazy(() => import('../pages/profile/Profile'));
const Place = lazy(() => import('../pages/place/Place'));
const EditProfile = lazy(() => import('../pages/mybobo/editprofile'));
const MyBobo = lazy(() => import('../pages/mybobo'));

const Routes = {
    
    user: [
        { path: "/:placeName/photos/:placeId",  private: true, component: <PlaceSeeAllPhotos />},
        { path: "/searchforplace",  private: true, component: <SearchForPlace /> },
        { path: "/settings",  private: true, component: <SettingsPage /> },
        { path: "/:cityName/posts/:cityId",  private: false, component: <CityPostsPage /> },
        { path: "/post/:postId",  private: true, component: <PostPage /> },
        { path: "/nearme",  private: true, component: <NearMe /> },
        { path: "/seewhatsaround",  private: true, component: <WhatsNearMe /> },
        { path: "/start",  private: false, component: <Start /> },
        { path: "/login",  private: false, component: <Login /> },
        { path: "/login/confirm",  private: false, component: <ConfirmLogin /> },
        { path: "/signup",  private: false, component: <Signup /> },
        { path: "/signup/confirm",  private: false, component: <ConfirmSignup /> },
        { path: "/:userName/followers",  private: true, component: <Followers /> },
        { path: "/:userName/followings",  private: true, component: <Followings /> },
        { path: "/mybobo",  private: true, component: <MyBobo /> },
        { path: "/editprofile",  private: true, component: <EditProfile /> },
        { path: "/profile/:userName",  private: false, component: <Profile /> },
        { path: "/place/:placeId",  private: false, component: <Place /> },
        { path: "/favorites",  private: false, component: <Favorites /> },
        { path: "/",  private: true, component: <Home /> },
    ]
};

export default Routes;