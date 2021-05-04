import { InputAdornment, makeStyles } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/Info';
import LanguageIcon from '@material-ui/icons/Language';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import AutoCompleteInput from '../../components/AutoComplete/AutoCompleteInput';
import EditProfileAppBar from '../../components/Profile/EditProfile/EditProfileAppBar';
import ProfileAvatar from '../../components/Profile/ProfileAvatar';
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';
import formikObjectBuilder from '../../lib/formik/formikObjectBuilder';
import httpClientBuilder from '../../lib/HttpClient';
import InputRenderer from '../../lib/InputRenderer';
import { PropType } from '../../lib/proptypes';
import { actions } from '../../lib/reducer/actions';
import { useStateValue } from '../../lib/store/appState';
import Toast from '../../lib/toastHelper';
import { useProfileModelValidationSchema } from '../../Models/ProfileModel';
const useStyle = makeStyles((theme) => ({
    text: {
        color: theme.palette.primary.main
    }
}))
export default function EditProfile({ user }) {
    const [, dispatch] = useStateValue();


    const { t } = useTranslation('common');
    const router = useRouter();
    const { avatarURl, bio, city, favorites, noOfFollowers,

        noOfFollowings, noOfPosts, userName, website, displayName } = user;


    var onsubmit = (formik) => () => {
        if (formik.isValid) {
            formik.setSubmitting(true);
            Toast("درحال ویرایش پروفایل...");
            BrowserHttpClient.MultiPartFormData("/Profile/Edit", formik.values)
                .then(response => {
                    formik.setSubmitting(false);
                    toast.dismiss();
                    if (response.successFull) {
                        dispatch({ type: actions.USER, payload: formik.values });
                        router.back();
                    } else {
                        console.error(response.etailedMessage)
                        toast("ویرایش پروفایل با خطا روبرو شد");
                    }
                }).catch(error => {
                    formik.setSubmitting(false);
                    console.error(error)
                    toast("ویرایش پروفایل با خطا روبرو شد");
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
        console.log('file: ', file);
        formik.setFieldValue("files", file[0])
    }
    return <>
        <EditProfileAppBar submiting={formik.isSubmitting} save={onsubmit(formik)} />
        <ProfileAvatar userName={userName} avatarURl={avatarURl} onAvatarSelected={avatarChanged} />
        <InputRenderer
            key="displayName"
            error={formik.errors.displayName}
            onChange={formik.handleChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                ),
            }}
            Name="displayName"
            // Hint={formik.errors.displayName}
            value={formik.values.displayName}
            autoComplete="off" placeholder={t('displayName')} Type={PropType.Text} fullWidth />

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
            autoComplete="off" placeholder={t('userName')} Type={PropType.Text} Name="userName" fullWidth />

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
            autoComplete="off" placeholder={t('userName')} Type={PropType.Hidden} Name="cityId" fullWidth />
        <AutoCompleteInput
            defaultValue={formik.values.city}
            inputcomponent={
                <InputRenderer
                    key="city"
                    onChange={formik.handleChange}
                    error={formik.errors?.city}
                    value={formik.values.city}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationOnIcon />
                            </InputAdornment>
                        ),
                    }}
                    autoComplete="off" placeholder="شهر فعلی" Type={PropType.Text}
                    Name="city" fullWidth />
            }
            queryUrl={"/Location/Citys/{query}"}
            onSelected={(value) => { formik.setFieldValue("cityId", value?.id) }}
        />
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
            value={favorites}
            autoComplete="off" placeholder={t('favorites')} Type={PropType.Text} Name="favorites" fullWidth />
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
            autoComplete="off" placeholder={t('website')} Type={PropType.Text} Name="website" fullWidth />

        <InputRenderer
            key="bio"
            onChange={formik.handleChange}
            error={formik.errors.bio}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <InfoIcon />
                    </InputAdornment>
                ),
            }}
            value={formik.values.bio}
            autoComplete="off" placeholder={t('bioPlaceHolder')}
            Type={PropType.TextArea} Name="bio" fullWidth />
    </>
}
export async function getServerSideProps({ locale, ...context }) {
    var httpClient = httpClientBuilder(context);
    var result = await httpClient.Get(`/profile/me`);

    return {
        props: {
            ...await serverSideTranslations(locale, ['common']),
            user: result.response
        }
    }
}