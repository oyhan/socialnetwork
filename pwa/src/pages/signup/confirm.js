import { CircularProgress, makeStyles, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ButtonBobo from '../../components/Button/ButtonBobo';
import ToolbarBackButton from '../../components/Button/ToolbarBackButton';
import SimpleInput from '../../components/Input/SimpleInput';
import OtpTimer from '../../components/OtpTimer/OtpTimer';
import { setCredentials } from '../../helper/cookieHelper';
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';
import useFormikObjectBuilder from '../../lib/formik/formikObjectBuilder';
import { actions } from '../../lib/reducer/actions';
import { useStateValue } from '../../lib/store/appState';
import { useSignupConfirmModelValidationSchema } from '../../Models/SignupConfirm';

const useStyle = makeStyles((theme) => ({
    text: {
        color: theme.palette.primary.main
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 78,
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
        color: 'white !important'
    },
    input: {
        height: '53px',
        width: '100%',
        marginBottom: '10px',
        letterSpacing:10,
        textAlign:'center'
    },
    error: {
        marginBottom: '10px',
        marginTop: '-9px'
    }
}))

export default function Confirm() {
    const schema = useSignupConfirmModelValidationSchema();
    const [, dispatch] = useStateValue();
    const history = useHistory();
    const [timer, setTimer] = useState(120)
    const loctation = useLocation();

    const onsubmit = () => {
        formik.setSubmitting(true);
        if (formik.isValid) {
            BrowserHttpClient.Post(`/User/ConfirmPhoneNumber/${loctation.state.phoneNumber}/${formik.values.token}`)
                .then(response => {

                    setCredentials(response);
                    dispatch({
                        type: actions.USER,
                        payload: response.user
                    })

                    // document.cookie=`jwt=${response.token}`;
                    window.location.href = "/"

                })
        }

    };
    const classes = useStyle();
    const [currentStep, setCurrentStep] = useState(0);
    var formik = useFormik(useFormikObjectBuilder({}, schema, onsubmit))

    const Step1 = <>
        <SimpleInput
            onChange={formik.handleChange}
            error={formik.errors.token}
            key="token"
            inputClassName={classes.input}
            errorClassName={classes.error}
            value={formik.values.token}
            autoComplete="off" placeholder={'——————'} type={'text'} name="token" />
    </>;


    const steps = [{ title: "ثبت نام", step: Step1 }]

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

        formik.setSubmitting(false);
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
            <div className={classes.stepContainer}>
                <Typography className={classes.labelContainer}>
                    {steps[currentStep].title}
                </Typography>
                {
                    steps[currentStep].step
                }
                <ButtonBobo className={classes.btn} color='primary' variant='contained' onClick={handleNext} disabled={formik.isSubmitting || !formik.isValid}>
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