import * as Yup from 'yup'
import { useTranslation } from 'next-i18next'
import { BrowserHttpClient } from '../lib/BrowserHttpClient';

var SignUpModel = {

    userName: "",
    phoneNumber: "",

}

export default SignUpModel;

export function useSignUpModelValidationSchema() {
    const { t } = useTranslation('common');
    return (Yup.object({
        userName: Yup.string().required(t("mandatory")).min(6, t('userNameMinLength', { length: 6 })).max(20, t('userNameMaxLength', { length: 20 }))
            .test('Unique Email', t('UserNameInUse'),
                (value) => {
                     return BrowserHttpClient.Get(`http://localhost:12089/user/UsernameAvailable/${value}`)
                        .then(() => true).catch(() => false)
                })

        ,
        phoneNumber: Yup.string().mobileNumber("شماره موبایل معتبر نیست").required("اجباری")
    }))
}
