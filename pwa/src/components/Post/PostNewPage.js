
import { Avatar, Container, Grid, makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SearchIcon from '@material-ui/icons/Search';
import { AvatarGroup } from '@material-ui/lab';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';
import useFormikObjectBuilder from '../../lib/formik/formikObjectBuilder';
import useWebp from '../../lib/hooks/ImageCompress/useWebp';
import InputRenderer from '../../lib/InputRenderer';
import { PropType } from '../../lib/proptypes';
import Toast from '../../lib/toastHelper';
import { usePostNewModelValidationSchema } from '../../Models/PostNewModel';
import AppBar from '../AppBar/AppBar';
import ToolbarButton from '../Button/ToolBarButton';
import PostPlaceTag from './PostPlaceTag';
import SearchPlacePost from './SearchPlacePost';

const useStyles = makeStyles((theme) => ({
    toolBar: {
        direction: 'rtl'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    large: {
        width: 92,
        height: 92,
        margin: 'auto'
    },
    divider: {
        margin: '-1px -16px',
    },
    row1: {
        // marginBottom: 150,
        marginTop: 35
    },
    selectPlaceTag: {
        color: 'rgba(110, 100, 100, 1)',
        "& > p": {

        },
        fontSize: 15,
        width: '75%',
        textAlign: 'start',
    },
    selectTagContainer: {
        margin: '18.9px 0',
        marginBottom: 10,
    },
    divider2: {
        margin: '-1px -16px',
        marginTop: 15
    },
    counterWrapper: {
        position: 'relative',
        textAlign: 'right',
        marginBottom: 10,
        color: 'rgba(110, 100, 100, 1)',
    }
}));

export default function PostNewPage({ cityId }) {
    const location = useLocation();

    const [compressing, photos] = useWebp(location.state.files, 0.5);
    const [openSearch, setOpenSearch] = useState(false);
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
        router.goBack();
        // handleWindow(false);
    };

    const handleTextArea = (e)=>{
        if(e.target.value.length> 500) return;
        formik.handleChange(e);
    }

    var onsubmit = () => {
        formik.setSubmitting(true);
        if (formik.isValid) {
            Toast("درحال ارسال پست...");
            BrowserHttpClient.MultiPartFormData("/post/new", formik.values)
                .then(response => {
                    formik.setSubmitting(false);
                    toast.dismiss();
                    if (response.successFull) {
                        // handleWindow(false);
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


    const leftIcon = [<ToolbarButton color='primary' disabled={formik.isSubmitting} onClick={formik.handleSubmit} >
        <Typography color='primary' >
            پست
   </Typography>
    </ToolbarButton>]
    const rightIcon = <ToolbarButton onClick={handleClose} >
        <Typography color='textPrimary' >
            بازگشت
   </Typography>
    </ToolbarButton>;

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
        <>
            <AppBar height={68} short leftIcons={leftIcon} appBarColor='transparent' title="پست جدید" rightIcon={rightIcon} />
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
                      <Grid container>
                      <Typography className='s16'>
                            یک توضیح اضافه کنید
                        </Typography>&nbsp;<Typography className='s15 placeTag'>(الزامی)</Typography>
                      </Grid>
                      
                        <InputRenderer
                            key="text"
                            onChange={handleTextArea}
                            margin="dense"

                            // error={formik.errors.text}
                            value={formik.values.text}
                            autoComplete="off" 
                            InputProps={{
                                disableUnderline: true,
                            }}
                            rows={8}
                            Type={PropType.TextArea} Name="text" fullWidth />
                    </Grid>

                </Grid>
                <div className={classes.counterWrapper}>
                    <Typography className='s15'>
                        {`${formik.values.text.length}/500`}
                    </Typography>

                </div>
                <Divider className={classes.divider} />
                {!cityId &&

                    <Grid container justify='space-between' className={classes.selectTagContainer} >
                        {
                            !tag && <SearchIcon htmlColor='rgba(100, 90, 90, 0.7)' />
                        }
                        <Typography className={classes.selectPlaceTag} onClick={() => setOpenSearch(true)}  >
                            تگ یک مکان را اضافه کنید (الزامی)
                                </Typography>

                        <KeyboardArrowUpIcon htmlColor='rgba(100, 90, 90, 0.7)' />
                    </Grid>


                }
                {
                    tag && <PostPlaceTag onClose={() => setTag(null)} name={tag.name} />
                }
                <Divider className={classes.divider2} />

            </Container>
            <SearchPlacePost open={openSearch} handleWindow={setOpenSearch} onSelectPlace={handleSelectPlace} />
        </>
    )
}