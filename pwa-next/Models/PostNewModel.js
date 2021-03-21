import { useTranslation } from 'next-i18next'


import * as Yup from 'yup'
import { BrowserHttpClient } from '../lib/BrowserHttpClient';
import { useStateValue } from '../lib/store/appState';
var PostNewModel = {

    text: "",
    files: "",
    placeId: "",

}


export default PostNewModel;

export function usePostNewModelValidationSchema() {
    const { t } = useTranslation('common');
    const [{ user }] = useStateValue();
    return (Yup.object({
        text: Yup.string().required(t("mandatory")).max(500, t('postNewTextMaxLength', { length: 500 })),
        placeId: Yup.string().required(t("mandatory")),
       
    }))
}
