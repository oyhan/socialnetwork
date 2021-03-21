import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import InputRenderer from '../../lib/InputRenderer';
import { Avatar, Chip, Container, Grid, InputAdornment } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { PropType } from '../../lib/proptypes';
import ToolbarButton from '../Button/ToolBarButton';
import { useFormik } from 'formik';
import useFormikObjectBuilder from '../../lib/formik/formikObjectBuilder';
import PostNewModel, { usePostNewModelValidationSchema } from '../../Models/PostNewModel';
import AutoCompleteInput from '../autoComplete/AutoCompleteInput';
import { useTranslation } from 'next-i18next'
import { BrowserHttpClient } from '../../lib/BrowserHttpClient';
import { useRouter } from 'next/router'
import { AvatarGroup } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    toolBar: {
        direction: 'rtl'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
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
    
    const router = useRouter();
    const classes = useStyles();
    const [urls, setUrls] = useState([]);
    console.log('urls: ', urls);
    




    const { t } = useTranslation('common');

    const handleClickOpen = () => {

    };

    useEffect(() => {
        if (photos) {
            for (const photo of photos) {
                const imageUrl = window.URL.createObjectURL(photo);
                console.log('imageUrl: ', imageUrl);
                
                setUrls((before)=>[...before, imageUrl]);
                formik.setFieldValue('files', photos);
            }

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
        BrowserHttpClient.MultiPartFormData("http://localhost:12089/post/new", formik.values)
            .then(response => {
                formik.setSubmitting(false);
                if (response.successFull) {
                    router.push(`/#${response.response}`)
                }
            }).catch(error => {
                
                formik.setSubmitting(false);


            });
    }

    const schema = usePostNewModelValidationSchema();
    var formik = useFormik(useFormikObjectBuilder({
        text: "",
        files: photos[0],
        placeId: "",


    }, schema, onsubmit))
    

    return (

        <div  >
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <Toolbar className={classes.toolBar}>
                    <ToolbarButton color='primary' disabled={formik.isSubmitting} onClick={formik.handleSubmit} >
                        <Typography color='primary'>
                            پست
                       </Typography>
                    </ToolbarButton>

                    <ToolbarButton color='primary' onClick={handleClose} >
                        <Typography color='primary'>
                            انصراف
                       </Typography>
                    </ToolbarButton>
                </Toolbar>
                <Container>

                    <Grid container className={classes.row1} >

                        <Grid item xs={4}>
                            <Grid justify="center"  >
                                {
                                    urls.length > 1 ?
                                        <AvatarGroup max={3}>
                                            {
                                                urls.map((i, key) =>
                                                    <Avatar  alt="post image" src={i} className={classes.large} />

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
                                autoComplete="off" placeholder={t('textPlaceHolder')}
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
                        queryUrl={"http://localhost:12089/place/search/{query}"}
                        onSelected={(value) => { formik.setFieldValue("placeId", value?.id) }}
                    />



                </Container>

            </Dialog>
        </div>
    );
}

