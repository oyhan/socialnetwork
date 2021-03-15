import React, { useEffect } from 'react';
import { makeStyles, InputAdornment, TextField } from '@material-ui/core';
import { useStateValue } from '../../lib/store/appState';
import EditProfileAppBar from '../../components/Profile/EditProfile/EditProfileAppBar';
import InputRenderer from '../../lib/InputRenderer';
import { PropType } from '../../lib/proptypes';
import { AccountCircle } from '@material-ui/icons';
import AppBar from '../../components/AppBar/AppBar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LanguageIcon from '@material-ui/icons/Language';
import InfoIcon from '@material-ui/icons/Info';
import EmailIcon from '@material-ui/icons/Email';
import ProfileAvatar from '../../components/Profile/ProfileAvatar';
import { actions } from '../../lib/reducer/actions';
import AutoCompleteInput from '../../components/autoComplete/AutoCompleteInput';
import { useFormik } from 'formik';
import ProfileModel, { useProfileModelValidationSchema } from '../../Models/ProfileModel';
import formikObjectBuilder from '../../lib/formik/formikObjectBuilder';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import ValidationTextField from '../../lib/ValidationTextField';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
const useStyle = makeStyles((theme) => ({
    text: {
        color: theme.palette.primary.main
    }
}))
export default function EditProfile() {
    const [{ user }, dispatch] = useStateValue();
    const { t } = useTranslation('common');
    const router = useRouter();
    const { avatarURl, bio, city, favorites, noOfFollowers,
        noOfFollowings, noOfPosts, userName, website, displayName } = user;
    var onsubmit = (formiks) => () => {
        formiks.setSubmitting(true);
        BrowserHttpClient.MultiPartFormData("http://localhost:12089/Profile/Edit", formiks.values)
            .then(response => {
                if (response.successFull) {
                    router.back();
                }
            }).catch(error => {
            });
    }
    const schema = useProfileModelValidationSchema();
    var formik = useFormik(formikObjectBuilder(user, schema, onsubmit))
    useEffect(() => {
        formik.setValues(user);
    }, [user])
    const avatarChanged = (file) => {
        formik.setFieldValue("files", file)
    }
    return <>
        <EditProfileAppBar save={onsubmit(formik)} />
        <ProfileAvatar userName={userName} onAvatarSelected={avatarChanged} />
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
        <AutoCompleteInput inputcomponent={
            <InputRenderer
                key="cityId"
                onChange={formik.handleChange}
                error={formik.errors?.cityId}
                value={formik.values.cityId}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LocationOnIcon />
                        </InputAdornment>
                    ),
                }}
                autoComplete="off" placeholder="شهر فعلی" Type={PropType.Text}
                Name="cityId" fullWidth />
        }
            queryUrl={"http://localhost:12089/Location/Citys/{query}"}
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
            value={website}
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
            value={bio}
            autoComplete="off" placeholder={t('bioPlaceHolder')}
            Type={PropType.TextArea} Name="bio" fullWidth />
    </>
}
export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...await serverSideTranslations(locale, ['common'])
        }
    }
}