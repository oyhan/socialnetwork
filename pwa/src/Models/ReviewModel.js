import * as Yup from 'yup';

var ReviewNewModel = {

    rate: "",
    title: "",
    description: "",
    dateVisited: "",

}

export default ReviewNewModel;

export function useReviewNewModelValidationSchema() {
    return (Yup.object({
        // title: Yup.string().required("اجباری").max(500, "حداکثر 500 کاراکتر"),
        // description: Yup.string().required("اجباری").max(500, "حداکثر 500 کاراکتر"),
        // DateVisited: Yup.string().required("اجباری"),
        // rate: Yup.number().required("اجباری").min(1).max(5),
       
    }))
}
