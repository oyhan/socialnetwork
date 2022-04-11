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
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

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
        // marginTop: -125
    },
    titleInput: {
        border: '1px solid rgba(196, 196, 196, 0.98)',
        borderRadius: 7,
        height: 50,

    },
    textInput: {
        border: '1px solid rgba(196, 196, 196, 0.98)',
        borderRadius: 7,
        height: 100,
        paddingLeft: 10,
        "& ::placeholder": {
            fontSize: 20,
            fontWeight: 400,
            color: 'black !important'
        }
    }
    ,
    counterWrapper: {
        position: 'relative',
        textAlign: 'right',
        marginBottom: 10,
        color: '#645A5A',
        width: '100%'
    },
    pickerWrapper: {
        background: '#EFEFE3',
        width: 100,
        height: 100,
        marginLeft: -8,
        "& svg": {
            fontSize: 28
        }
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReviewNewDialog({ open, handleWindow, placeId, placeName }) {

    const classes = useStyles();
    const [urls, setUrls] = useState([]);
    const [selecteRate, setSelectedRate] = useState("");
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
        <Typography color='primary' className='s20'  >
            ارسال
   </Typography>
    </ToolbarButton>

    const leftIcon = [<ToolbarButton onClick={handleClose} >
        <Typography color='primary' className='s20' >
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


        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar paddingTop={11} titleFontSize={23} height={56} paddingLeft={0} short leftIcons={leftIcon} appBarColor='transparent' title={placeName} rightIcon={rightIcon} />
            <Divider />
            <Container>
                <Grid container justify='center' className={classes.negetiveMargin}>
                    <Box m='31px 0px 0 0'>
                        <Typography className='s20 ' component='span' variant='h6'>
                            تجربه‌تان چگونه بوده ‌است؟
                        </Typography>&nbsp;
                            <Typography className='s20 mandatory' component='span'>
                            (الزامی)
                        </Typography>
                    </Box>
                </Grid>
                <Box m='24px 0px 29px 0'>
                    <Grid container justify='center'>
                        <Rate input size='large' onchange={handleSelecRate} />
                        {/* <Typography><Box m='0 10px'>{selecteRate}</Box></Typography> */}
                    </Grid>
                </Box>
            </Container>
            <Divider />
            <Container>
                <Grid container>
                    <Box m='16px 0px 0 0'>
                        <Typography className='s20 ' component='span' variant='h6'>
                            نظرتان را بنویسید
                        </Typography>&nbsp;
                            <Typography className='s20 mandatory' component='span'>
                            (الزامی)
                        </Typography>
                    </Box>

                    <InputRenderer
                        InputProps={{
                            disableUnderline: true
                        }}
                        classes={{ root: classes.textInput }}
                        key="description"
                        onChange={formik.handleChange}
                        error={formik.errors.description}
                        value={formik.values.description}
                        rows={6}
                        autoComplete="off" placeholder={"نظر شما به دیگران برای انتخاب بهتر کمک خواهد کرد"}
                        Type={PropType.TextArea} Name="description" fullWidth />

                    <div className={classes.counterWrapper}>
                        <Typography className='s17'>
                            حداقل 100 کاراکتر
                            </Typography>

                    </div>
                </Grid>
                <Grid container>
                    <Box m='11px 0px 0 0'>
                        <Typography className='s20 ' component='span' variant='h6'>
                            یک عنوان به نظر خود اضافه کنید
                        </Typography>&nbsp;
                            <Typography className='s20 mandatory' component='span'>
                            (الزامی)
                        </Typography>
                    </Box>

                </Grid>
                <Grid container>
                    <InputRenderer
                        InputProps={{
                            disableUnderline: true
                        }}
                        classes={{ root: classes.titleInput }}
                        key="title"
                        onChange={formik.handleChange}
                        error={formik.errors.title}
                        value={formik.values.title}
                        autoComplete="off"
                        Type={PropType.Text} Name="title" fullWidth />

                </Grid>
                <Grid container>
                    <Box marginTop={'100px'} marginLeft={'10px'}>
                        <Typography className='s20'>
                            اضافه کردن عکس
                            </Typography>
                        <ImageUploader pickerComponent={<PhotoPicker />} multiple receiveFiles={handleSelectPhoto} />
                    </Box>

                </Grid>
                {/* <Grid container>
                </Grid> */}

            </Container>


        </Dialog>

    );
}

const PhotoPicker = (props) => {
    const classes = useStyles();

    return (
        <label {...props}>
            <Grid container justify='center' alignItems='center' className={classes.pickerWrapper}>
                <PhotoCameraIcon  color='primary' />
            </Grid>
        </label>

    )
}