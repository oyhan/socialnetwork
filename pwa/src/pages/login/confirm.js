import { CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';
// import "../../styles/login.css"
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ButtonBobo from '../../components/Button/ButtonBobo';
import SimpleInput from '../../components/Input/SimpleInput';
import OtpTimer from '../../components/OtpTimer/OtpTimer';
import { setCredentials } from '../../helper/cookieHelper';
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';
import { actions } from '../../lib/reducer/actions';
import { useStateValue } from '../../lib/store/appState';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '78px',
        justifyContent: 'center',
        height: 450,
        alignItems: 'center'
    },
    stepContainer: {
        width: '90%',
    },
    labelContainer: {
        fontSize: '30px',
        marginBottom: '18px',
    },
    btn: {
        height: '55px',
        backgroundColor: 'black !important',
        width: '100% !important',
        color: 'white !important',
        borderRadius: 8,

    },
    input: {
        height: '53px',
        width: '100%',
        marginBottom: '10px',
        letterSpacing: 10,
        textAlign: 'center'
    },
    error: {
        marginBottom: '10px',
        marginTop: '-9px'
    }
})

export default function Confirm() {
    const location = useLocation();

    const history = useHistory();
    const [, dispatch] = useStateValue();
    const classes = useStyles();
    const onSubmit = (e) => {

        formik.setSubmitting(true);
        const baseUrl = "";
        const otp = formik.values.otp;
        BrowserHttpClient.Post(`${baseUrl}/User/ConfirmPhoneNumber/${location.state.mobileNumber}/${otp}`).
            then((response) => {

                setCredentials(response);

                dispatch({
                    type: actions.USER,
                    payload: response.user
                })

                // document.cookie=`jwt=${response.token}`;
                window.location.href = "/"
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
            otp: Yup.string().required("لطفا کد تایید را وارد کنید").matches("^[0-9]+$", "فقط مقدار عددی وارد کنید").min(6, "کد تایید باید 6 رقم باشد")
        }),
        validateOnMount: false,
        // initialErrors: {
        //     otp: " "
        // },
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
        <Grid justify='space-evenly' direction='column' container className={classes.root} >

            <form onSubmit={formik.handleSubmit} className={classes.stepContainer}>
                <Typography className={classes.labelContainer}>
                    ورود
                </Typography>
                <SimpleInput autoComplete="off" disabled={formik.isSubmitting} onChange={formik.handleChange}
                    error={formik.errors.otp}
                    type={'text'} name="otp"
                    inputClassName={classes.input}
                    errorClassName={classes.error}
                    placeholder="――――――" />
                <ButtonBobo className={classes.btn} variant='contained' type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? <CircularProgress /> : "تایید"}
                </ButtonBobo>
            </form>
            <OtpTimer callback={retry} initial={timer} />
        </Grid>
    )
}

