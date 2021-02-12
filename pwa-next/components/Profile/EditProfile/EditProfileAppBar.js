import { Button } from '@material-ui/core';
import React from 'react';
import AppBar from '../../AppBar/AppBar';
import ToolbarButton from '../../Button/ToolBarButton';
import ProfileAvatar from '../ProfileAvatar';
import { useRouter } from 'next/router'

const extera = (
  <ProfileAvatar />
)



export default function EditProfileAppBar(){
    const router = useRouter();

    const handleCancel = ()=>{
        router.back();
    }

    const handleSave = ()=>{

        console.log("saved");
    }
    const rightIcon = <ToolbarButton onClick={handleSave}>ذخیره</ToolbarButton>
    const leftIcon = [
        <ToolbarButton onClick={handleCancel} >انصراف</ToolbarButton>
    ]
    return (
        <AppBar leftIcons={leftIcon} rightIcon={rightIcon} /*extera={extera}*/  title="ویرایش پروفایل"/>
    )
}

