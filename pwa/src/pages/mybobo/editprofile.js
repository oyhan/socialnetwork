import { Container, Grid, InputAdornment, makeStyles, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/Info';
import LanguageIcon from '@material-ui/icons/Language';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import AutoCompleteInput from '../../components/AutoComplete/AutoCompleteInput';
import SearchDialog from '../../components/Dialog/SearchDialog';
import EditProfileAppBar from '../../components/Profile/EditProfile/EditProfileAppBar';
import SearchCity from '../../components/Profile/EditProfile/SearchCity';
import ProfileAvatar from '../../components/Profile/ProfileAvatar';
import { BrowserHttpClient, useHttpClient } from '../../lib/BrowserHttpClient';
import formikObjectBuilder from '../../lib/formik/formikObjectBuilder';
import InputRenderer from '../../lib/InputRenderer';
import { PropType } from '../../lib/proptypes';
import { actions } from '../../lib/reducer/actions';
import { useStateValue } from '../../lib/store/appState';
import Toast from '../../lib/toastHelper';
import { useProfileModelValidationSchema } from '../../Models/ProfileModel';

const useStyle = makeStyles((theme) => ({
    text: {
        color: theme.palette.primary.main
    },
    inputs: {
        "&  svg": {
            color: '#857D7D'
        },
        "& input::placeholder": {
            fontSize: 16,
            color: '#8A7F7F',
        }
    }
}))
export default function EditProfile() {
    const [, dispatch] = useStateValue();
    const classes = useStyle();
    const [openSearch, setOpenSearch] = useState(false);
    const [loading, user, error] = useHttpClient("/profile/me", "Get", r => r.response);
    const router = useHistory();
    const { avatarURl, bio, city, favorites, noOfFollowers,

        noOfFollowings, noOfPosts, userName, website, displayName } = user;


    var onsubmit = (formik) => () => {
        if (formik.isValid) {
            formik.setSubmitting(true);
            Toast("?????????? ???????????? ??????????????...");
            BrowserHttpClient.MultiPartFormData("/Profile/Edit", formik.values)
                .then(response => {
                    formik.setSubmitting(false);
                    toast.dismiss();
                    if (response.successFull) {
                        dispatch({ type: actions.USER, payload: formik.values });
                        router.goBack();
                    } else {

                        toast("???????????? ?????????????? ???? ?????? ?????????? ????");
                    }
                }).catch(error => {
                    formik.setSubmitting(false);
                    toast("???????????? ?????????????? ???? ?????? ?????????? ????");
                    toast.dismiss();
                }).finally(() => {
                    toast.dismiss();

                });
        }


    }
    const schema = useProfileModelValidationSchema();
    var formik = useFormik(formikObjectBuilder(user, schema, onsubmit))



    useEffect(() => {

        formik.setValues(user);


        formik.validateForm();
    }, [user])
    const avatarChanged = (file) => {

        formik.setFieldValue("avatar", file[0])
    }
    const handleSelectHeaderPicture = (headerFile) => {

        formik.setFieldValue("header", headerFile)
    }
    const selectCity = (citySelected) => {
        formik.setFieldValue("cityId", citySelected.id)
        formik.setFieldValue("city", `${citySelected.province},${citySelected.city}`);
        setOpenSearch(false);
    }
    return <>
        <EditProfileAppBar headerPic={user.headerPic} submiting={formik.isSubmitting} save={onsubmit(formik)} onSelectHeaderPicture={handleSelectHeaderPicture} />

        <ProfileAvatar noTitle avatarURl={avatarURl} onAvatarSelected={avatarChanged} />

        <Container className={classes.inputs}>
            <InputRenderer
                key="displayName"
                error={formik.errors.displayName}
                onChange={formik.handleChange}

                Name="displayName"
                // Hint={formik.errors.displayName}
                value={formik.values.displayName}
                autoComplete="off" placeholder={"?????? ????????????"} Type={PropType.Text} fullWidth />

            <InputRenderer
                onChange={formik.handleChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AlternateEmailIcon />
                        </InputAdornment>
                    ),
                }}
                error={formik.errors.userName}
                key="userName"
                value={formik.values.userName}
                autoComplete="off" placeholder={"?????? ????????????"} Type={PropType.Text} Name="userName" fullWidth />

            <InputRenderer
                onChange={formik.handleChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AlternateEmailIcon />
                        </InputAdornment>
                    ),
                }}
                error={formik.errors.cityId}
                key="cityId"
                value={formik.values.cityId}
                autoComplete="off" placeholder={"??????"} Type={PropType.Hidden} Name="cityId" fullWidth />

            <InputRenderer
                onChange={formik.handleChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LocationOnIcon />
                        </InputAdornment>
                    ),
                }}
                onClick={() => setOpenSearch(true)}
                error={formik.errors.cityId}
                key="city"
                value={formik.values.city}
                autoComplete="off" placeholder={"?????? ????????"} Type={PropType.Text} Name="city" fullWidth />

            {/* { <AutoCompleteInput
            defaultValue={formik.values.city}
            inputcomponent={
                <InputRenderer
                    key="city"
                    onChange={formik.handleChange}
                    error={formik.errors?.cityId}
                    value={formik.values.city}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationOnIcon />
                            </InputAdornment>
                        ),
                    }}
                    autoComplete="off" placeholder="?????? ????????" Type={PropType.Text}
                    Name="city" fullWidth />
            }
            queryUrl={"/Location/Citys/{query}"}
            onSelected={(value) => { formik.setFieldValue("cityId", value?.id) }}
        />} */}


            <InputRenderer
                key="favorites"
                onChange={formik.handleChange}
                error={formik.errors.favorites}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FavoriteIcon />
                        </InputAdornment>
                    ),
                }}
                value={formik.values.favorites}
                autoComplete="off" placeholder={"????????????????????? ????"} Type={PropType.Text} Name="favorites" fullWidth />
            <InputRenderer
                key="website"
                onChange={formik.handleChange}
                error={formik.errors.website}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LanguageIcon />
                        </InputAdornment>
                    ),
                }}
                value={formik.values.website}
                autoComplete="off" placeholder={"????????????"} Type={PropType.Text} Name="website" fullWidth />

            <InputRenderer
                key="bio"
                onChange={formik.handleChange}
                error={formik.errors.bio}
                rows={0}
                value={formik.values.bio}
                autoComplete="off" placeholder={"???????????? ?????? ?????????????? ??????????????"}
                Type={PropType.TextArea} Name="bio" fullWidth />

            <Typography>
                ???????????? 160 ??????????????
            </Typography>

            <SearchDialog handleWindow={setOpenSearch} open={openSearch} toolbar={() => { }} >
                <SearchCity handleSelectedCity={selectCity} handleClose={setOpenSearch} />
            </SearchDialog>
        </Container>
    </>

}
