import RoomIcon from '@material-ui/icons/Room';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LaptopIcon from '@material-ui/icons/Laptop';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PinDropOutlinedIcon from '@material-ui/icons/PinDropOutlined';
import Rate from "../Rate/Rate";
import { Box, Container, Divider, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import Map from "../Map/Map";
import clsx from 'clsx';
import usePlacePageStyles from './PlacePage.css';
import Link from 'next/link';


export default function PlaceOverview(props) {
    
    const { name, noOfReviews, cuisine, distanceToUser, website, telephone, rate, isOpenNow, services,favorite,
        address, location } = props;

    const classes = usePlacePageStyles();
    return (
        <>
            <Grid container justify='space-around'>
                <Grid item>
                    <Grid container direction='column' >
                        <Typography variant='h6' >
                            <Box fontWeight='fontWeightBold'>
                                {name}
                            </Box>
                        </Typography>
                        <Grid container>
                            <Rate value={rate} />
                            <Typography color='disabled' variant='caption' >
                                <Box m='0 5px'>
                                    {noOfReviews} نظر
                               </Box>
                            </Typography>
                        </Grid>
                        <Typography variant='caption'>{cuisine}</Typography>

                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container direction='column' alignItems='center'>
                        <Grid item>
                            <IconButton aria-label="add to favorites" >
                                {
                                    favorite ? <FavoriteIcon color='primary' /> : <FavoriteBorderIcon />
                                }
                            </IconButton>
                        </Grid>

                        <Grid container >
                            <RoomIcon />
                            <Typography color='textSecondary' component='div' variant='caption'>
                                {distanceToUser}
                            </Typography>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
            <Container>
                <Grid container className={classes.caption}>
                    <Typography variant='subtitle2'>
                        <Box fontWeight='fontWeightBold'>
                            اطلاعات رستوران
                        </Box>
                    </Typography>
                </Grid>

                <Grid container className={classes.row} >
                    <Grid item xs={10} className={classes.alignCenter}>
                        <Grid container>
                            <LaptopIcon color='primary' />
                            <Typography><Box margin='0 10px'>وبسایت</Box></Typography>
                        </Grid>

                    </Grid>
                    <Grid item xs={2}>
                        <Link href={website || ""} >
                            <IconButton ><ArrowBackIosIcon /></IconButton>
                        </Link>
                    </Grid>
                </Grid>

                <Divider />

                <Grid container className={classes.row}>
                    <Grid item xs={10} className={classes.alignCenter}>
                        <Grid container>
                            <PhoneEnabledIcon color='primary' />
                            <Typography color='primary'><Box margin='0 10px'>{telephone}</Box></Typography>
                        </Grid>

                    </Grid>

                </Grid>

                <Divider />

                <Grid container className={classes.row}>
                    <Grid item xs={10} className={classes.alignCenter}>
                        <Grid container>
                            <Grid item>
                                <QueryBuilderIcon color='primary' />
                            </Grid>
                            <Box m='0 10px' fontWeight='fontWeightLight'>
                                <Grid item>
                                    <Grid container direction='column'>
                                        {
                                            isOpenNow ?
                                                <Typography variant='caption' ><Box>الان باز است</Box></Typography> :
                                                <Typography variant='caption' ><Box>بسته است</Box></Typography>
                                        }
                                        <Typography variant='caption' ><Box>16:00-00:00</Box></Typography>
                                        <Typography variant='caption' ><Box>23:00-17:00</Box></Typography>
                                    </Grid>
                                </Grid>
                            </Box>


                        </Grid>

                    </Grid>
                    <Grid item xs={2}>
                        <IconButton ><ArrowBackIosIcon /></IconButton>
                    </Grid>

                </Grid>

                <Divider />

                <Grid container className={classes.row}>
                    <Grid item xs={10} className={classes.alignCenter}>
                        <Grid container>
                            <RoomServiceIcon color='primary' />
                            <Typography variant='caption'><Box margin='0 10px'>{services}</Box></Typography>
                        </Grid>

                    </Grid>

                </Grid>
                <Divider />

                <Grid container className={clsx(classes.map, classes.row)}>
                    <Map points={[location]} />
                </Grid>

                <Divider />

                <Grid container className={classes.row}>
                    <Grid item xs={10} className={classes.alignCenter}>
                        <Grid container>
                            <PinDropOutlinedIcon color='primary' />
                            <Typography variant='caption'><Box margin='0 10px'>{address}</Box></Typography>
                        </Grid>

                    </Grid>

                </Grid>



            </Container>

        </>)
}
