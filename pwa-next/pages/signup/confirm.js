import React, { useState } from 'react';
import { Typography, makeStyles, CircularProgress } from '@material-ui/core';
import InputRenderer from '../../lib/InputRenderer';
import { useFormik } from 'formik';
import useFormikObjectBuilder from '../../lib/formik/formikObjectBuilder';
import { PropType } from '../../lib/proptypes';
import { Container } from 'next/app';
import ButtonBobo from '../../components/Button/ButtonBobo';
import ToolbarBackButton from '../../components/Button/ToolbarBackButton';
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';
import { useSignupConfirmModelValidationSchema } from '../../Models/SignupConfirm';
import cookieCutter from 'cookie-cutter'
import { useCookies } from "react-cookie"
import { useStateValue } from '../../lib/store/appState';
import { actions } from '../../lib/reducer/actions';
import { useRouter } from 'next/router';

const useStyle = makeStyles((theme) => ({
    text: {
        color: theme.palette.primary.main
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 50,
        justifyContent: 'center',
        height: 450,
        alignItems: 'center'
    }
}))

export default function Confirm({ phoneNumber }) {
    const schema = useSignupConfirmModelValidationSchema();
    const [cookie, setCookie] = useCookies(["user"])
    const [, dispatch] = useStateValue();
    const history = useRouter();

    const onsubmit = () => {
        formik.setSubmitting(true);
        if (formik.isValid) {
            BrowserHttpClient.Post(`http://localhost:12089/User/ConfirmPhoneNumber/${phoneNumber}/${formik.values.token}`)
                .then(response => {
                    const userCookie = JSON.stringify(response.user);
                    localStorage.setItem("user", userCookie);


                    setCookie("user", userCookie);
                    cookieCutter.set('refreshToken', response.refreshToken);
                    cookieCutter.set('jwt', response.token);

                    dispatch({
                        type: actions.USER,
                        payload: response.user
                    })

                    // document.cookie=`jwt=${response.token}`;
                    location.href = "/"

                })
        }

    };
    const classes = useStyle();
    const [currentStep, setCurrentStep] = useState(0);
    var formik = useFormik(useFormikObjectBuilder({}, schema, onsubmit))

    const Step1 = <>
        <InputRenderer
            onChange={formik.handleChange}
            error={formik.errors.token}
            key="token"
            value={formik.values.token}
            autoComplete="off" placeholder={'کد تایید'} Type={PropType.Text} Name="token" />
    </>;


    const steps = [{ title: "کد تایید", step: Step1 }]

    const handleNext = () => {
        if (currentStep == steps.length - 1) {
            onsubmit();
        }
        else {
            setCurrentStep(currentStep + 1);
        }

    }

    const handleBack = () => {
        if (currentStep == 0) {
            return;
        }
        setCurrentStep(currentStep - 1);


    }

    const retry = () => {
        setTimer(120);
    }
    
    return <>
        {
            currentStep != 0 && <ToolbarBackButton handleClick={handleBack} />
        }
        <div className={classes.root} >
            <div>
                <Typography>
                    {steps[currentStep].title}
                </Typography>
                {
                    steps[currentStep].step
                }
                <ButtonBobo color='primary' variant='contained' onClick={handleNext} disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? <CircularProgress /> : currentStep == steps.length - 1 ? "ارسال کد تایید" : "بعدی"}
                </ButtonBobo>
                <OtpTimer callback={retry} initial={timer} />

            </div>
        </div>
    </>
}


export async function getServerSideProps(context) {
    const phoneNumber = context.query.phoneNumber;
    return {
        props: {
            phoneNumber
        }
    }
}