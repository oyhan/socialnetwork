import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ButtonBobo from '../../components/Button/ButtonBobo';
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';
import InputRenderer from '../../lib/InputRenderer';
import { PropType } from '../../lib/proptypes';
import UserManagerBuilder from '../../lib/userManager';


const useStyles = makeStyles({
    root: {
        height: 450,
        alignItems: 'center'
    }
})

export default function Login() {

    const classes = useStyles();
    const history = useHistory();
    const baseUrl = "";
    const onSubmit = () => {

        formik.setSubmitting(true);
        BrowserHttpClient.Post(`${baseUrl}/user/login/${formik.values.mobilenumber}`).
            then((respons) => {

                formik.setSubmitting(false);
                history.push("/login/confirm", { mobileNumber: formik.values.mobilenumber });
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
        <Grid justify='space-evenly' direction='column' container className={classes.root} >


            <form onSubmit={formik.handleSubmit}>
                <InputRenderer fullWidth autoComplete="off" disabled={formik.isSubmitting}
                    onChange={formik.handleChange}
                    error={formik.errors.mobilenumber}
                    Type={PropType.Number} Name="mobilenumber"
                    DisplayName="شماره موبایل"
                    placeholder="شماره موبایل" />
                <ButtonBobo color='primary' variant='contained' type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? <CircularProgress /> : "ورود"}
                </ButtonBobo>
            </form>

        </Grid>
    )
}

