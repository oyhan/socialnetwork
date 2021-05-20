import { Avatar, Chip, Container, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { AvatarGroup } from '@material-ui/lab';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';
import useFormikObjectBuilder from '../../lib/formik/formikObjectBuilder';
import InputRenderer from '../../lib/InputRenderer';
import { PropType } from '../../lib/proptypes';
import Toast from '../../lib/toastHelper';
import { usePostNewModelValidationSchema } from '../../Models/PostNewModel';
import AppBar from '../AppBar/AppBar';
import AutoCompleteInput from '../AutoComplete/AutoCompleteInput';
import ToolbarButton from '../Button/ToolBarButton';
import {useHistory} from 'react-router-dom'
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
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PostNewDialog({ open, handleWindow, photos }) {

    const router = useHistory();
    const classes = useStyles();
    const [urls, setUrls] = useState([]);






   
    const handleClickOpen = () => {

    };

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

        return () => {
            for (const url of urls) {
                URL.revokeObjectURL(url);

            }
        }
    }, [photos])

    const handleClose = () => {

        for (const url of urls) {
            URL.revokeObjectURL(url);
        }
        setUrls([]);
        handleWindow(false);
    };
    var onsubmit = () => {

        formik.setSubmitting(true);
        if (formik.isValid) {
            Toast("درحال ارسال پست...");
            BrowserHttpClient.MultiPartFormData("/post/new", formik.values)
                .then(response => {
                    formik.setSubmitting(false);
                    toast.dismiss();
                    if (response.successFull) {
                        handleWindow(false);
                        toast("پست شما با موفقیت ارسال شد");
                        router.push(`/`);
                        toast.dismiss();
                    }
                }).catch(error => {
                    console.error('error sendig post : ', error);
                    formik.setSubmitting(false);
                    toast.error("ارسال پست با خطا روبرو شد");
                });
        }

    }

    const schema = usePostNewModelValidationSchema();
    var formik = useFormik(useFormikObjectBuilder({
        text: "",
        files: photos[0],
        placeId: "",


    }, schema, onsubmit))


    const rightIcon = <ToolbarButton color='primary' disabled={formik.isSubmitting} onClick={formik.handleSubmit} >
        <Typography color='primary' >
            پست
   </Typography>
    </ToolbarButton>

    const leftIcon = [<ToolbarButton onClick={handleClose} >
        <Typography color='primary' >
            انصراف
   </Typography>
    </ToolbarButton>]

    return (

        <div  >
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar leftIcons={leftIcon} appBarColor='transparent' title="پست جدید" rightIcon={rightIcon} />

                <Container>

                    <Grid container className={classes.row1} >

                        <Grid item xs={4}>
                            <Grid justify="center"  >
                                {
                                    urls.length > 1 ?
                                        <AvatarGroup max={3}>
                                            {
                                                urls.map((i, key) =>
                                                    <Avatar alt="post image" src={i} />

                                                )
                                            }
                                        </AvatarGroup>
                                        :
                                        <Avatar variant='square' alt="post image" src={urls[0]} className={classes.large} />

                                }

                            </Grid>
                        </Grid>

                        <Grid item xs={8}>
                            <InputRenderer
                                key="text"
                                onChange={formik.handleChange}
                                error={formik.errors.text}
                                value={formik.values.text}
                                autoComplete="off" placeholder={"یک توضیح اضافه کنید (الزامی)"}
                                Type={PropType.TextArea} Name="text" fullWidth />

                        </Grid>

                    </Grid>

                    <Divider className={classes.divider} />

                    <AutoCompleteInput
                        renderOption={(option) => <Chip color='primary' label={`${option.name}`} />}
                        resultSelector={(result) => result.response}
                        getOptionLabel={(item) => item.name}

                        inputcomponent={
                            <InputRenderer
                                key="placeId"
                                onChange={formik.handleChange}
                                error={formik.errors?.placeId}
                                value={formik.values.placeId}
                                autoComplete="off" placeholder="یک مکان انتخاب کنید" Type={PropType.Text}
                                Name="placeId" fullWidth />
                        }
                        queryUrl={"/place/search/{query}"}
                        onSelected={(value) => { formik.setFieldValue("placeId", value?.id) }}
                    />



                </Container>

            </Dialog>
        </div>
    );
}

