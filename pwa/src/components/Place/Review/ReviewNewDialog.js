import { Box, Container, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BrowserHttpClient } from '../../../lib/BrowserHttpClient';
import useFormikObjectBuilder from '../../../lib/formik/formikObjectBuilder';
import InputRenderer from '../../../lib/InputRenderer';
import { PropType } from '../../../lib/proptypes';
import ReviewNewModel, { useReviewNewModelValidationSchema } from '../../../Models/ReviewModel';
import AppBar from '../../AppBar/AppBar';
import ToolbarButton from '../../Button/ToolBarButton';
import ImageUploader from '../../ImageUploader/ImageUploader';
import Rate from '../../Rate/Rate';
import Toast from '../../../lib/toastHelper'
const useStyles = makeStyles((theme) => ({
    toolBar: {
        direction: 'rtl'

    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        margin: 'auto' 
    },
    divider: {
        margin: theme.spacing(3)
    },
    row1: {
        marginBottom: 150
    },
    negetiveMargin: {
        marginTop: -125
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReviewNewDialog({ open, handleWindow, placeId, place }) {

    const classes = useStyles();
    const [urls, setUrls] = useState([]);
    const [selecteRate, setSelectedRate] = useState("")
    const [photos, setPhotos] = useState([])


    const handleSelectPhoto = (files) => {
        setPhotos(files);
    }

    useEffect(() => {

        var i = 0;
        if (photos) {
            for (const photo of photos) {
                const imageUrl = window.URL.createObjectURL(photo);

                formik.setFieldValue(`file${i}`, photos[i]);

                setUrls((before) => [...before, imageUrl]);
                i++;
            }
            // formik.setFieldValue('files', [...photos]);
        }
    }, [photos])

    const handleClose = () => {
        handleWindow(false);
    };
    var onsubmit = () => {

        if (formik.isValid) {
            formik.setSubmitting(true);
            Toast("...درحال ثبت نظر شما");

            BrowserHttpClient.MultiPartFormData(`/review/${placeId}`, formik.values)
                .then(response => {
                    formik.setSubmitting(false);
                    if (response.successFull) {
                        toast.dismiss();
                        handleWindow(false);
                    }
                }).catch(error => {
                    formik.setSubmitting(false);
                    toast.dismiss();
                    console.error('error in sending review: ', error);
                    toast.error("ثبت نظر با خطا روبرو شد");

                });
        }

    }

    const schema = useReviewNewModelValidationSchema();
    var formik = useFormik(useFormikObjectBuilder(
        { ...ReviewNewModel, placeId: placeId }, schema, onsubmit))


    const rightIcon = <ToolbarButton color='primary' disabled={formik.isSubmitting} onClick={formik.handleSubmit} >
        <Typography color='primary' >
            ثبت نظر
   </Typography>
    </ToolbarButton>

    const leftIcon = [<ToolbarButton onClick={handleClose} >
        <Typography color='primary' >
            انصراف
   </Typography>
    </ToolbarButton>]




    const handleSelecRate = (value) => {
        formik.setFieldValue("rate", value);


        var phrase = ""
        switch (value) {
            case 1:
                phrase = "وحشتناک"
                break;
            case 2:
                phrase = "ضعیف"
                break;
            case 3:
                phrase = "معمولی"
                break;
            case 4:
                phrase = "خیلی خوب"
                break;
            case 5:
                phrase = "عالی"
                break;

            default:
                break;
        }
        setSelectedRate(phrase);
    }

    return (

        <div  >
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar leftIcons={leftIcon} appBarColor='transparent' title={place.name} rightIcon={rightIcon} />
                <Container>
                    <Grid container justify='center' className={classes.negetiveMargin}>
                        <Typography variant='h6'>
                            <Box m='20px 0'>تجربه‌تان چگونه بوده‌است؟(الزامی)</Box>
                        </Typography>
                    </Grid>
                    <Box m='20px 0'>
                        <Grid container justify='center'>
                            <Rate input size='large' onchange={handleSelecRate} />
                            <Typography><Box m='0 10px'>{selecteRate}</Box></Typography>
                        </Grid>
                    </Box>
                    <Divider />
                    <Grid container>
                        <Typography>
                            <Box>نظرتان را بنویسید(الزامی)</Box>
                        </Typography>
                        <InputRenderer
                            key="description"
                            onChange={formik.handleChange}
                            error={formik.errors.description}
                            value={formik.values.description}
                            autoComplete="off" placeholder={"نظر شما به دیگران برای انتخاب بهتر کمک خواهد کرد"}
                            Type={PropType.TextArea} Name="description" fullWidth />

                    </Grid>
                    <Grid container>
                        <Typography>
                            <Box>یک عنوان اضافه کنید(الزامی)</Box>
                        </Typography>
                    </Grid>
                    <Grid container>
                        <InputRenderer
                            key="title"
                            onChange={formik.handleChange}
                            error={formik.errors.title}
                            value={formik.values.title}
                            autoComplete="off" placeholder={"یک عنوان انتخاب کنید"}
                            Type={PropType.Text} Name="title" fullWidth />

                    </Grid>
                    <Grid container>
                        <Typography>
                            <Box>اضافه کردن عکس</Box>
                        </Typography>
                    </Grid>
                    <Grid container>
                        <ImageUploader multiple receiveFiles={handleSelectPhoto} />
                    </Grid>

                </Container>


            </Dialog>
        </div>
    );
}

