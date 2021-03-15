import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router'
import InputRenderer from '../../lib/InputRenderer';
import ButtonBobo from '../../components/Button/ButtonBobo';
import { PropType } from '../../lib/proptypes';
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';
import { getCookieParser } from 'next/dist/next-server/server/api-utils';

import UserManagerBuilder from '../../lib/userManager';

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

export default function Login() {

    const classes = useStyles();
    const history = useRouter();
    const baseUrl = "http://localhost:12089";
    const onSubmit = () => {
        
        formik.setSubmitting(true);
        BrowserHttpClient.Post(`${baseUrl}/user/login/${formik.values.mobilenumber}`).
            then((respons) => {
                
                formik.setSubmitting(false);
               
                    history.push({pathname :"/login/confirm" , query :{mobileNumber: formik.values.mobilenumber} })
                toast.success("کد تایید برای شما پیامک شد");
            }).catch(error => {
                
                formik.setSubmitting(false);
                toast.error(error);
            })
    }
    const formik = useFormik({
        initialValues: {
            mobilenumber: "",
        },
        validationSchema: Yup.object({
            mobilenumber: Yup.string().length(11, "شماره موبایل به صورت 11 رقمی و با 0 شروع می شود").mobileNumber("موبایل معتبر وارد کنید")
        }),
        validateOnMount: false,
        initialErrors: true,
        onSubmit: onSubmit
    });
     return (
        <div className={classes.root} >
            {/* <div>
                <img className="logo" src={omranLogo} />  <img className="logo" src={freeZoneLogo} />
            </div> */}
            <form onSubmit={formik.handleSubmit}>
                <InputRenderer fullWidth autoComplete="off" disabled={formik.isSubmitting} 
                onChange={formik.handleChange}
                    error={formik.errors.mobilenumber}
                    Type={PropType.Text} Name="mobilenumber"
                    DisplayName="شماره موبایل"
                    placeholder="شماره موبایل" />
                <ButtonBobo color='primary' variant='contained' type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? <CircularProgress /> : "ورود"}
                </ButtonBobo>
            </form>
            
        </div>
    )
}

export async function getServerSideProps(context){

    const userManager = UserManagerBuilder(context);
    const cookie = getCookieParser(context.req)()
    const user = userManager.Load(cookie);
    if (user) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    };

    return {
        props :{
        
        }
    }

}
