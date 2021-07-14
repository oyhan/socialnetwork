import { Avatar, Chip, Container, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { AvatarGroup } from '@material-ui/lab';
import { FormikProvider, useFormik } from 'formik';
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
import { useHistory } from 'react-router-dom'
import ThinDivider from '../Dividers/ThinDevider';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Link} from 'react-router-dom'
import PostPlaceTag from './PostPlaceTag';

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
        margin: '-1px -16px',
    },
    row1: {
        marginBottom: 150,
        marginTop: 35
    },
    selectPlaceTag: {
        color: 'rgba(110, 100, 100, 1)',
       "& > p" :{
        fontSize: 15,
       },
        width: '75%',
        textAlign: 'start',
    },
    selectTagContainer: {
        margin: '18.9px 0'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function PostNewDialog({ open, handleWindow, cityId, photos }) {
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
                        router.push(`/mybobo`);
                        toast.dismiss();
                    }
                }).catch(error => {
                    formik.setSubmitting(false);
                    toast.dismiss();
                    toast.error("ارسال پست با خطا روبرو شد");
                });
        }
    }

    const schema = usePostNewModelValidationSchema();

    var formik = useFormik(useFormikObjectBuilder({
        text: "",
        files: photos[0],
        placeId: "",
        cityId: cityId
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
    const [tag, setTag] = useState();
    const handleSelectPlace = (value) => {
        setTag(value);
        if (value.isCity) {
            formik.setFieldValue("cityId", value?.id)
        } else {
            formik.setFieldValue("placeId", value?.id)
        }
    }

   

    return (
        <div  >
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar short leftIcons={leftIcon} appBarColor='transparent' title="پست جدید" rightIcon={rightIcon} />
                <Divider />
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
                                // error={formik.errors.text}
                                value={formik.values.text}
                                autoComplete="off" placeholder={"یک توضیح اضافه کنید (الزامی)"}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                Type={PropType.TextArea} Name="text" fullWidth />
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    {!cityId &&

                        <Grid container justify='space-between' className={classes.selectTagContainer} >
                            <SearchIcon htmlColor='rgba(100, 90, 90, 0.7)' />
                            <Link to='/searchPlacePost' className={classes.selectPlaceTag}>
                                <Typography  >
                                    تگ یک مکان را اضافه کنید
                                </Typography>
                            </Link>

                            <KeyboardArrowUpIcon htmlColor='rgba(100, 90, 90, 0.7)' />
                        </Grid>



                        // <AutoCompleteInput
                        //     renderOption={(option) => <Chip color='primary' label={`${option.name}`} />}
                        //     resultSelector={(result) => result.response}
                        //     getOptionLabel={(item) => item.name}
                        //     inputcomponent={
                        //         <InputRenderer
                        //             key="placeId"
                        //             onChange={formik.handleChange}
                        //             error={formik.errors?.placeId}
                        //             value={formik.values.placeId}
                        //             InputProps={{
                        //                 disableUnderline: true,
                        //             }}
                        //             autoComplete="off" placeholder="یک مکان انتخاب کنید" Type={PropType.Text}
                        //             Name="placeId" fullWidth />
                        //     }
                        //     queryUrl={"/place/search/{query}/undefined"}
                        //     onSelected={handleSelectPlace}
                        // />

                    }
                    {
                        tag && <PostPlaceTag  name={tag.name}  />
                    }
                    <Divider className={classes.divider} />
                </Container>
            </Dialog>
        </div>
    );
}
