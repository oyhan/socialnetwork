import { useHistory } from 'react-router-dom';
import React from 'react';
import AppBar from '../../AppBar/AppBar';
import ToolbarButton from '../../Button/ToolBarButton';
import ProfileAvatar from '../ProfileAvatar';

const extera = (
    <ProfileAvatar />
)



export default function EditProfileAppBar({ save, submiting }) {
    const router = useHistory();

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
    return (
        <AppBar leftIcons={leftIcon} rightIcon={rightIcon} /*extera={extera}*/ title="ویرایش پروفایل" />
    )
}

