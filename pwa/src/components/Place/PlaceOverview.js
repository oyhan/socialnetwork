import { Box, Container, Divider, Grid, IconButton, Typography } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LaptopIcon from '@material-ui/icons/Laptop';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import PinDropOutlinedIcon from '@material-ui/icons/PinDropOutlined';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import RoomIcon from '@material-ui/icons/Room';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import clsx from 'clsx';
import { useEffect, useState } from "react";
import { BrowserHttpClient } from "../../lib/BrowserHttpClient";
import CustomLocationIcon from "../Icons/CustomLocationIcon";
import Map from "../Map/Map";
import Rate from "../Rate/Rate";
import usePlacePageStyles from './PlacePage.css';


export default function PlaceOverview(props) {

    const { name, noOfReviews, cuisine, distanceToUser, website, telephone, rate, isOpenNow, services, favorite,
        address, location, placeId } = props;
    console.log('id: ', placeId);
    const [faved, setFaved] = useState(false);

    useEffect(() => {
        setFaved(favorite);

    }, [favorite])
    const handlFave = () => {

        if (faved) {
            BrowserHttpClient.Post(`/place/unfave/${placeId}`).then(result => {
                setFaved(false)
            }).catch(error => {
                alert(error);
            })
        } else {
            BrowserHttpClient.Post(`/place/fave/${placeId}`).then(result => {
                setFaved(true)
            }).catch(error => {
                alert(error);
            })
        }
    }

    const classes = usePlacePageStyles();
    return (
        <>
            <Grid container className={classes.row2} justify='space-between'>
                <Grid item>
                    <Grid container direction='column' >
                        <Typography variant='h6' className="titr" >
                            <Box marginTop='5px' marginBottom='2px' fontWeight='fontWeightBold'>
                                {name}

                            </Box>
                        </Typography>
                        <Grid container>
                            {
                                rate != undefined && <Rate value={rate} />
                            }
                              &nbsp;
                    <Typography color='textSecondary' >
                                {noOfReviews} نظر
                    </Typography>
                        </Grid>
                        <Typography variant='caption'>{cuisine}</Typography>

                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container direction='column' alignItems='center'>
                        <Grid item>
                            <IconButton onClick={handlFave} aria-label="add to favorites" >
                                {
                                    faved ? <FavoriteIcon color='primary' fontSize='small' /> : <FavoriteBorderIcon fontSize='small' htmlColor='black' />
                                }
                            </IconButton>
                        </Grid>

                        <Grid container >
                            <RoomIcon fontSize='small' />
                            <Typography color='textSecondary' component='div' variant='caption'>
                                {distanceToUser}
                            </Typography>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>

            <Box marginTop='12px'>
                <Grid container className={classes.row2}>
                    <Typography variant='body2' className='placePageTxt'>
                        {cuisine}ایرانی،بین المللی،خاورمیانه
                </Typography>
                </Grid>
            </Box>


            <Box m='0 10px' className={classes.infoWrapper}>

                <Grid container className={classes.caption} style={{ marginTop: 50 }}>
                    <Box m='10px 0'>
                        <Typography className='s17' component='h4'>
                            اطلاعات رستوران
                </Typography>
                    </Box>
                </Grid>

                <Grid container className={classes.row} >
                    <Grid item xs={11} className={classes.alignCenter}>
                        <Grid container>
                            <LaptopIcon color='primary' />
                            <Typography className='placePageTxt s13'><Box margin='0 10px'>وبسایت</Box></Typography>
                        </Grid>

                    </Grid>
                    <Grid item xs={1}>
                        <a href={website || ""} >
                            <IconButton size='small' ><ArrowBackIosIcon style={{ fontSize: '12px', marginRight: 11 }} fontSize='small' /></IconButton>
                        </a>
                    </Grid>
                </Grid>

                <Divider />

                <Grid container className={classes.row}>
                    <Grid item xs={10} className={classes.alignCenter}>
                        <Grid container>
                            <PhoneEnabledIcon color='primary' />
                            <Typography className='s13' color='primary'><Box margin='0 10px'>{telephone}</Box></Typography>
                        </Grid>

                    </Grid>

                </Grid>

                <Divider />

                <Grid container alignItems='center' className={classes.row}>
                    <Grid item xs={11} className={classes.alignCenter}>
                        <Grid container>
                            <Grid item>
                                <QueryBuilderIcon color='primary' />
                            </Grid>
                            <Box m='0 10px' fontWeight='fontWeightLight'>
                                <Grid item>
                                    <Grid container direction='column'>
                                        {
                                            isOpenNow ?
                                                <Typography className='placePageTxt s12' variant='caption' ><Box>الان باز است</Box></Typography> :
                                                <Typography className='placePageTxt s12' variant='caption' ><Box>بسته است</Box></Typography>
                                        }
                                        <Typography className='placePageTxt s12' variant='caption' ><Box>16:00-00:00</Box></Typography>
                                        <Typography className='placePageTxt s12' variant='caption' ><Box>23:00-17:00</Box></Typography>
                                    </Grid>
                                </Grid>
                            </Box>


                        </Grid>

                    </Grid>
                    <Grid item xs={1}>
                        <IconButton size='small' ><ArrowBackIosIcon style={{ fontSize: '12px', marginRight: 11 }} fontSize='small' /></IconButton>
                    </Grid>

                </Grid>

                <Divider />

                <Grid container className={classes.row}>
                    <Grid item xs={10} className={classes.alignCenter}>
                        <Grid container>
                            <RoomServiceIcon color='primary' />
                            <Typography className='placePageTxt s12' variant='caption'><Box margin='0 10px'>{services}</Box></Typography>
                        </Grid>

                    </Grid>

                </Grid>
                <Divider />

                <Grid container className={clsx(classes.map, classes.row)}>
                    {
                        location && <Map scrollWheelZoom={false} dragging={false} point={location} points={[location]} />
                    }
                </Grid>

                <Divider />

                <Grid container className={clsx(classes.row, classes.endingBlock)}>
                    <Grid item xs={10} className={classes.alignCenter}>
                        <Grid container>
                            <CustomLocationIcon color='primary' />
                            <Typography className='placePageTxt s12' variant='caption'><Box margin='0 10px'>{address}</Box></Typography>
                        </Grid>

                    </Grid>

                </Grid>


            </Box>



        </>)
}
