import React, { useEffect, useState } from 'react';
// import "../../styles/login.css"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router'
import InputRenderer from '../../lib/InputRenderer';
import ButtonBobo from '../../components/Button/ButtonBobo';
import { PropType } from '../../lib/proptypes';
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';
import OtpTimer from '../../components/OtpTimer/OtpTimer';
import UserManagerBuilder from '../../lib/userManager';
import cookieCutter from 'cookie-cutter'
import { useCookies } from "react-cookie"
import { useStateValue } from '../../lib/store/appState';
import { actions } from '../../lib/reducer/actions';

 const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 50,
        justifyContent: 'space-evenly',
        height: 450,
        alignItems: 'center'
    }
})

export default function Confirm({ mobileNumber }) {
    const history = useRouter();
    const [cookie, setCookie] = useCookies(["user"])
    const [,dispatch]  = useStateValue();
    const classes = useStyles();
    const onSubmit = (e) => {
        formik.setSubmitting(true);
        const baseUrl = "";
        const otp = formik.values.otp;
        BrowserHttpClient.Post(`${baseUrl}/User/ConfirmPhoneNumber/${mobileNumber}/${otp}`).
            then((response) => {
                // 
                // 
                const userCookie = JSON.stringify(response.user);
                localStorage.setItem("user",userCookie);
                
                const testUser = JSON.parse(userCookie);
                
                setCookie("user",userCookie,{path:"/"});
                const opts = {path:"/"}
                cookieCutter.set('refreshToken', response.refreshToken,opts);
                cookieCutter.set('jwt', response.token,opts);
                dispatch({
                    type:actions.USER,
                    payload : response.user
                })

                // document.cookie=`jwt=${response.token}`;
                location.href="/"     
            }).catch(error => {
                
                formik.setSubmitting(false);
                toast.error(error);
            })
    }

    const formik = useFormik({
        initialValues: {
            otp: "",
        },
        validationSchema: Yup.object({
            otp: Yup.string().matches("^[0-9]+$", "فقط مقدار عددی وارد کنید").min(6, "کدتایید باید 6 رقم باشد")
        }),
        validateOnMount: false,
        initialErrors: {
            otp: " "
        },
        isInitialValid: false,
        onSubmit: onSubmit,
    });


    useEffect(() => {
        if (formik.isValid)

            formik.submitForm();
    }, [formik.isValid])

    const [timer, setTimer] = useState(120)
    const retry = () => {
        setTimer(120);
    }

   
     return (
        <div className={classes.root} >

            <form onSubmit={formik.handleSubmit}>
                <InputRenderer fullWidth autoComplete="off" disabled={formik.isSubmitting} onChange={formik.handleChange}
                    error={formik.errors.otp}
                    Type={PropType.Number} Name="otp"
                    DisplayName="کد تایید"
                    placeholder="کد تایید" />
                <ButtonBobo color='primary' variant='contained' type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? <CircularProgress /> : "تایید"}
                </ButtonBobo>
            </form>
            <OtpTimer callback={retry} initial={timer} />
        </div>
    )
}

export async function getServerSideProps(context) {
    const mobileNumber = context.query.mobileNumber;
    return {
        props: {
            mobileNumber
        }
    }
}