import { lazy } from 'react';
import Home from '../pages/Home';

const Start = lazy(() => import('../pages/start/Start'));
const Login = lazy(() => import('../pages/login'));
const ConfirmSignup = lazy(() => import('../pages/signup/confirm'));
const Signup = lazy(() => import('../pages/signup/Signup'));
const ConfirmLogin = lazy(() => import('../pages/login/confirm'));
const Followers = lazy(() => import('../pages/user/followers'));
const Followings = lazy(() => import('../pages/user/followings'));
const Profile = lazy(() => import('../pages/profile/Profile'));
const Place = lazy(() => import('../pages/place/Place'));
// const Home = lazy(() => import('../pages/Home'));
const EditProfile = lazy(() => import('../pages/mybobo/editprofile'));
const MyBobo = lazy(() => import('../pages/mybobo'));

const Routes = {

    user: [
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
        { path: "/",  private: true, component: <Home /> },
    ]
};

export default Routes;