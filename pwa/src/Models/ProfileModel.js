// import { useTranslation } from 'next-i18next';
import * as Yup from 'yup';
import { BrowserHttpClient } from '../lib/BrowserHttpClient';
import { useStateValue } from '../lib/store/appState';


var ProfileModel = {

    displayName: "",
    userName: "",
    cityId: "",
    favorites: "",
    website: "",
    bio: ""

}


export default ProfileModel;

export function useProfileModelValidationSchema() {
    const [{ user }] = useStateValue();
    return (Yup.object({
        displayName: Yup.string().required("اجباری").min(6, "حداقل 6  کاراکتر").max(20, "حداکثر 20 کاراکتر"),
        userName: Yup.string().required("اجباری").min(6, "حداقل 6  کاراکتر").max(20, "حداکثر 20 کاراکتر")
            .test('Unique Email', "نام کاربری تکراریست",
                (value) => {
                    if (user.userName == value)
                        return true;
                    else return BrowserHttpClient.Get(`/user/UsernameAvailable/${value}`)
                        .then(() => true).catch(() => false)
                })

        ,
        cityId: Yup.string().required("اجباری"),
        favorites: "",
        website: "",
        bio: ""
    }))
}
