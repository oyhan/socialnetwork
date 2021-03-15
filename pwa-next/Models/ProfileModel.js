import { useTranslation } from 'next-i18next'


import * as Yup from 'yup'
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

    return (Yup.object({
        displayName: Yup.string().required(t("mandatory")).min(6, t('displayNameMinLength', { length: 6 })).max(20, t('displayNameMaxLength', { length: 20 })),
        userName: Yup.string().required(t("mandatory")).min(6, t('userNameMinLength', { length: 6 })).max(20, t('userNameMaxLength', { length: 20 })),
        cityId: Yup.string().required(t("mandatory")),
        favorites: "",
        website: "",
        bio: ""
    }))
}
