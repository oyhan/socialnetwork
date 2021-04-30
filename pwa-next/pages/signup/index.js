import { CircularProgress, makeStyles, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ButtonBobo from '../../components/Button/ButtonBobo';
import ToolbarBackButton from '../../components/Button/ToolbarBackButton';
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';
import useFormikObjectBuilder from '../../lib/formik/formikObjectBuilder';
import InputRenderer from '../../lib/InputRenderer';
import { PropType } from '../../lib/proptypes';
import { useSignUpModelValidationSchema } from '../../Models/SignupModel';

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

export default function Signup() {
    const schema = useSignUpModelValidationSchema();
    const history = useRouter();
    const onsubmit = () => {
        formik.setSubmitting(true);
        if (formik.isValid) {
            BrowserHttpClient.Post("/User/Register", JSON.stringify(formik.values))
                .then(response => {
                    formik.setSubmitting(false);
                    history.push({ pathname: "/signup/confirm", query: { phoneNumber: formik.values.phoneNumber } })
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
        <InputRenderer
            onChange={formik.handleChange}
            error={formik.errors.phoneNumber}
            key="phoneNumber"
            value={formik.values.phoneNumber}
            autoComplete="off" placeholder={'شماره موبایل'} Type={PropType.Number} Name="phoneNumber" />
    </>;
    const Step2 = <>
        <InputRenderer
            onChange={formik.handleChange}
            error={formik.errors.userName}
            key="userName"
            value={formik.values.userName}
            autoComplete="off" placeholder={'نام کاربری'} Type={PropType.Text} Name="userName" />
    </>;

    const steps = [{ title: "شماره همراه", step: Step1 }, { title: "نام کاربری", step: Step2 }]

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
            </div>
        </div>
    </>
}