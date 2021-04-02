import { useTranslation } from 'next-i18next'
import * as Yup from 'yup'

var ReviewNewModel = {

    rate: "",
    title: "",
    description: "",
    dateVisited: "",

}

export default ReviewNewModel;

export function useReviewNewModelValidationSchema() {
    const { t } = useTranslation('common');
    return (Yup.object({
        title: Yup.string().required(t("mandatory")).max(500, t('postNewTextMaxLength', { length: 500 })),
        description: Yup.string().required(t("mandatory")).max(500, t('reviewNewDescritionMaxLength', { length: 500 })),
        // DateVisited: Yup.string().required(t("mandatory")),
        rate: Yup.number().required(t("mandatory")).min(1).max(5),
       
    }))
}
