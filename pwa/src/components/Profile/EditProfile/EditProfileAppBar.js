import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '../../AppBar/AppBar';
import ToolbarButton from '../../Button/ToolBarButton';
import ProfileAvatar from '../ProfileAvatar';
import PhotoOutlinedIcon from '@material-ui/icons/PhotoOutlined';
import { IconButton } from '@material-ui/core';
import ImageUploader from '../../ImageUploader/ImageUploader';
const extera = (
    <ProfileAvatar />
)



export default function EditProfileAppBar({ save, submiting, onSelectHeaderPicture ,headerPic}) {
    
    const router = useHistory();
    
    const [headerBg, setHeaderBg] = useState(headerPic);
    
    const handleCancel = () => {
        router.goBack();
    }

    const handleSave = () => {
        save && save();

    }
    const rightIcon = <ToolbarButton disabled={submiting} onClick={handleSave}>ذخیره</ToolbarButton>
    const leftIcon = [
        <ToolbarButton onClick={handleCancel} >انصراف</ToolbarButton>
    ]

    const handleSelectHeaderPicture = (pictures) => {
        setHeaderBg(window.URL.createObjectURL(pictures[0]));
        onSelectHeaderPicture(pictures[0])
    }

    const setHeaderBtn =
        <ImageUploader sizeLimit={200} receiveFiles={handleSelectHeaderPicture} nothumbnail
            pickerComponent={<IconButton component='label'>
                <PhotoOutlinedIcon htmlColor='gray' />
            </IconButton>} />

    return (
        <AppBar  leftIcons={leftIcon} headerPic={headerBg||headerPic} rightIcon={rightIcon} middleCenterElement={setHeaderBtn} title="ویرایش پروفایل" />
    )
}

