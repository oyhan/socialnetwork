import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
// import "../../styles/login.css"
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ButtonBobo from '../../components/Button/ButtonBobo';
import OtpTimer from '../../components/OtpTimer/OtpTimer';
import { setCredentials } from '../../helper/cookieHelper';
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';
import InputRenderer from '../../lib/InputRenderer';
import { PropType } from '../../lib/proptypes';
import { actions } from '../../lib/reducer/actions';
import { useStateValue } from '../../lib/store/appState';

const useStyles = makeStyles({
    root: {
       
        height: 450,
        alignItems: 'center'
    },
    input: {
        "& input" : {
            letterSpacing:10,
            textAlign :'center',
        }
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
        <Grid justify='space-evenly' direction='column' container className={classes.root} >

            <form onSubmit={formik.handleSubmit}>
                <InputRenderer  autoComplete="off" disabled={formik.isSubmitting} onChange={formik.handleChange}
                    error={formik.errors.otp}
                    Type={PropType.Number} Name="otp"
                    DisplayName="کد تایید"
                    className={classes.input}
                    placeholder="______" />
                <ButtonBobo color='primary' variant='contained' type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? <CircularProgress /> : "تایید"}
                </ButtonBobo>
            </form>
            <OtpTimer callback={retry} initial={timer} />
        </Grid>
    )
}

