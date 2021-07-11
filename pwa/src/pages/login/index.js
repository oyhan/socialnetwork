import { CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ButtonBobo from '../../components/Button/ButtonBobo';
import SimpleInput from '../../components/Input/SimpleInput';
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';


const useStyles = makeStyles({
    root: {
        height: 450,
        alignItems: 'center',
        marginTop: '48px'
    },
    btn: {
        height: '55px',
        backgroundColor: 'black !important',
        width: '100%',
        color: 'white !important',
        borderRadius: 8,
    },
    stepContainer: {
        width: '90%',
    },
    input: {
        height: '53px',
        width: '100%',
        marginBottom: '10px',
    },
    error: {
        marginBottom: '10px',
        marginTop: '-9px'
    },
    labelContainer: {
        fontSize: '30px',
        marginBottom: '18px',
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


            <form onSubmit={formik.handleSubmit} className={classes.stepContainer}>
                <Typography className={classes.labelContainer}>
                    ورود
                </Typography>
                <SimpleInput
                    inputClassName={classes.input}
                    errorClassName={classes.error}
                    autoComplete="off"
                    disabled={formik.isSubmitting}
                    onChange={formik.handleChange}
                    error={formik.errors.mobilenumber}
                    type={'text'} name="mobilenumber"
                    placeholder="شماره موبایل" />
                <ButtonBobo className={classes.btn} color='primary' variant='contained' type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? <CircularProgress /> : "ورود"}
                </ButtonBobo>
            </form>

        </Grid>
    )
}

