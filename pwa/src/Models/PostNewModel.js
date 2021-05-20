

import * as Yup from 'yup';
import { useStateValue } from '../lib/store/appState';
var PostNewModel = {

    text: "",
    files: "",
    placeId: "",

}


export default PostNewModel;

export function usePostNewModelValidationSchema() {
    
    const [{ user }] = useStateValue();
    return (Yup.object({
        text: Yup.string().required("اجباری").max(500, "حداکثر 500 کاراکتر"),
        placeId: Yup.string().required("اجباری"),
       
    }))
}
