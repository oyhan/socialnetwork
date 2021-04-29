import * as Yup from 'yup'
import { useTranslation } from 'next-i18next'
import { BrowserHttpClient } from '../lib/BrowserHttpClient';

var SignupConfirmModel = {

    token:"",
    mobileNumber: "",

}

export default SignupConfirmModel;

export function useSignupConfirmModelValidationSchema() {
    const { t } = useTranslation('common');
    return (Yup.object({
        token: Yup.string().required(t("mandatory")).min(6).max(6)
    }))
}
