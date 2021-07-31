import * as Yup from 'yup'
// import { useTranslation } from 'next-i18next'
import { BrowserHttpClient } from '../lib/BrowserHttpClient';

var SignUpModel = {

    userName: "",
    phoneNumber: "",

}

export default SignUpModel;

export function useSignUpModelValidationSchema() {
    // const { t } = useTranslation('common');
    return (Yup.object({
        userName: Yup.string().required("اجباری").min(6, "حداقل 6 کاراکتر").max(20, "حداکثر 20 کاراکتر")
            .test('Unique Email', "نام کاربری تکراریست",
                (value) => {
                    return BrowserHttpClient.Get(`/user/UsernameAvailable/${value}`)
                        .then(() => true).catch(() => false)
                })

        ,
        // phoneNumber: Yup.string().mobileNumber("شماره موبایل معتبر نیست").required("اجباری")
    }))
}
