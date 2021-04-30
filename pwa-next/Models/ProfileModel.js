import { useTranslation } from 'next-i18next';
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
    const { t } = useTranslation('common');
    const [{ user }] = useStateValue();
    return (Yup.object({
        displayName: Yup.string().required(t("mandatory")).min(6, t('displayNameMinLength', { length: 6 })).max(20, t('displayNameMaxLength', { length: 20 })),
        userName: Yup.string().required(t("mandatory")).min(6, t('userNameMinLength', { length: 6 })).max(20, t('userNameMaxLength', { length: 20 }))
            .test('Unique Email', t('UserNameInUse'),
                (value) => {
                    if (user.userName == value)
                        return true;
                    else return BrowserHttpClient.Get(`/user/UsernameAvailable/${value}`)
                        .then(() => true).catch(() => false)
                })

        ,
        cityId: Yup.string().required(t("mandatory")),
        favorites: "",
        website: "",
        bio: ""
    }))
}
