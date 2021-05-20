import * as Yup from 'yup'
var changePasswordModel = {
    currentPassword: "",
    newPassword: "",
    confirmpassword: ""
}
 const changePasswordValidationSchema = Yup.object({
    currentPassword: Yup.string()
    .required("فیلد اجباری"),
    newPassword: Yup.string()
    .required("فیلد اجباری")
        .oneOf([Yup.ref('confirmpassword'), null], 'کلمه عبور مطابقت ندارد')
        ,
    confirmpassword: Yup.string()
    .required("فیلد اجباری")
        .oneOf([Yup.ref('newPassword'), null], 'کلمه عبور مطابقت ندارد')
        ,
})
export  {
    changePasswordValidationSchema,
    changePasswordModel
} 
