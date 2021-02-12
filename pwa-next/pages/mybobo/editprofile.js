
import React, { useEffect } from 'react';
import { Typography, makeStyles, InputAdornment } from '@material-ui/core';
import { useStateValue } from '../../lib/store/appState';
import EditProfileAppBar from '../../components/Profile/EditProfile/EditProfileAppBar';
import InputRenderer from '../../lib/InputRenderer';
import { PropType } from '../../lib/proptypes';
import { AccountCircle } from '@material-ui/icons';
import AppBar from '../../components/AppBar/AppBar';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LanguageIcon from '@material-ui/icons/Language';
import InfoIcon from '@material-ui/icons/Info';
import ProfileAvatar from '../../components/Profile/ProfileAvatar';

const useStyle = makeStyles((theme) => ({
    text: {
        color: theme.palette.primary.main
    }
}))

export default function EditProfile() {
    const [, dispatch] = useStateValue();

    useEffect(() => {
        dispatch(<EditProfileAppBar />);
        return () => {
            dispatch(<AppBar />);
        }
    }, [])
    return <>
    
        <ProfileAvatar />
        <InputRenderer
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                ),
            }}
            autocomplete="off" placeholder="نام نمایشی" Type={PropType.Text} Name="displayName" fullWidth />

            <InputRenderer
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <AlternateEmailIcon />
                    </InputAdornment>
                ),
            }}
            autocomplete="off" placeholder="نام کاربری" Type={PropType.Text} Name="username" fullWidth />

            <InputRenderer
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <LocationOnIcon />
                    </InputAdornment>
                ),
            }}
            autocomplete="off" placeholder="شهر فعلی" Type={PropType.Text} 
            Name="currentCity" fullWidth />

            <InputRenderer
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <FavoriteIcon />
                    </InputAdornment>
                ),
            }}
            autocomplete="off" placeholder="علاقه‌مندی‌ها" Type={PropType.Text} Name="favorites" fullWidth />

            <InputRenderer
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <LanguageIcon />
                    </InputAdornment>
                ),
            }}
            autocomplete="off"  placeholder="وب‌سایت" Type={PropType.Text} Name="website" fullWidth />
            
            
            <InputRenderer
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <InfoIcon />
                    </InputAdornment>
                ),
            }}
            autocomplete="off" Hint="حداکثر 160 کاراکتر" placeholder="درباره خود جزئیاتی بنویسید" 
            Type={PropType.TextArea} Name="bio" fullWidth />
            
    </>
}


