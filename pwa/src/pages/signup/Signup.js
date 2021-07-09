import { CircularProgress, makeStyles, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ButtonBobo from '../../components/Button/ButtonBobo';
import ToolbarBackButton from '../../components/Button/ToolbarBackButton';
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';
import useFormikObjectBuilder from '../../lib/formik/formikObjectBuilder';
import { useSignUpModelValidationSchema } from '../../Models/SignupModel';
import { Input } from '@material-ui/icons';
import SimpleInput from '../../components/Input/SimpleInput';

const useStyle = makeStyles((theme) => ({
    text: {
        color: theme.palette.primary.main
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 450,
        alignItems: 'center',
    },
    stepContainer: {
        width: '90%',
    },
    firstPage: {
        marginTop: 48,
    },
    labelContainer: {
        fontSize: '30px',
        marginBottom: '18px',
    },
    btn: {
        height: '55px',
        backgroundColor: 'black !important',
        width: '100%',
        color: 'white !important'
    },
    input: {
        height: '53px',
        width: '100%',
        marginBottom: '10px',
    },
    error: {
        marginBottom: '10px',
        marginTop: '-9px'
    }
}))

export default function Signup() {
    const schema = useSignUpModelValidationSchema();
    const history = useHistory();
    const secondStep = 1;
    const onsubmit = () => {
        formik.setSubmitting(true);
        if (formik.isValid) {
            BrowserHttpClient.Post("/User/Register", JSON.stringify(formik.values))
                .then(response => {
                    formik.setSubmitting(false);
                    history.push("/signup/confirm", { phoneNumber: formik.values.phoneNumber });
                    toast.success("کد تایید برای شما پیامک شد");
                }).catch(error => {
                    formik.setSubmitting(false);
                    toast.error(error);
                })
        }

    };
    const classes = useStyle();
    const [currentStep, setCurrentStep] = useState(0);
    var formik = useFormik(useFormikObjectBuilder({}, schema, onsubmit))

    const Step1 = <>
        <SimpleInput
            inputClassName={classes.input}
            errorClassName={classes.error}
            onChange={formik.handleChange}
            error={formik.errors.phoneNumber}
            key="phoneNumber"
            value={formik.values.phoneNumber}
            autoComplete="off" placeholder={'شماره موبایل'} type={'text'} name="phoneNumber" />
    </>;
    const Step2 = <>
        <SimpleInput
            inputClassName={classes.input}
            errorClassName={classes.error}
            onChange={formik.handleChange}
            error={formik.errors.userName}
            key="userName"
            value={formik.values.userName}
            autoComplete="off" placeholder={'نام کاربری'} type={'text'} name="userName" />
    </>;

    const steps = [{ title: "شماره موبایل", step: Step1 }, { title: "نام کاربری", step: Step2 }]

    const isLastStep = () => {
        return currentStep == steps.length - 1
    }
    const handleNext = () => {
        if (isLastStep()) {
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
    return <>
        {
            currentStep != 0 && <ToolbarBackButton handleClick={handleBack} />
        }
        <div className={`${classes.root} ${currentStep != secondStep ? classes.firstPage : ''}`} >
            <div className={classes.stepContainer}>
                <Typography className={classes.labelContainer}>
                    ثبت نام
                </Typography>
                {
                    steps[currentStep].step
                }
                <ButtonBobo className={classes.btn} color='primary' variant='contained' onClick={handleNext} disabled={formik.isSubmitting || (!formik.isValid && isLastStep())}>
                    {formik.isSubmitting ? <CircularProgress /> : currentStep == steps.length - 1 ? "ارسال کد تایید" : "بعدی"}
                </ButtonBobo>
            </div>
        </div>
    </>
}