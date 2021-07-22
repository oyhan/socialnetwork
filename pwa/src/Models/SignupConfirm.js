// import { useTranslation } from 'next-i18next';
import * as Yup from 'yup';

var SignupConfirmModel = {

    token:"",
    mobileNumber: "",

}

export default SignupConfirmModel;

export function useSignupConfirmModelValidationSchema() {
    // const { t } = useTranslation('common');
    return (Yup.object({
        token: Yup.string().required("اجباری").min(6,"کد باید شش رقمی باشد").max(6,"کد باید شش رقمی باشد")
    }))
}
