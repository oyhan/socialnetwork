import { Box, CircularProgress, Grid, makeStyles, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import HorizontalSlider from "../Slider/HorizontalSlider/HorizontalSlider";
import SliderItem from "../Slider/SliderItem/SliderItem";

const useStyles = makeStyles(theme => ({
    mapSymbole: {
        background: 'url(/mapsymbole.png)',
        borderRadius: 9,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 105,
        margin: '4px 7px 18px 7px',
        cursor: 'pointer'
    },
    title: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    nearestRestaurantTitle: {
        marginBottom: theme.spacing(1),
        marginTop: '30px',
    }
}))

export default function HomeSection({ loading, items, title, linkTo, ...props }) {

    const classes = useStyles();
    return (
        loading ? <CircularProgress size="1rem" /> :

            <Box m='0 0px 0px 10px' {...props}>
                <Box marginRight='10px'>
                    <Grid justify='space-between' direction='row' spacing={0} container className={classes.title} >
                        <Typography component='h4' className='s17'>
                            {title}
                        </Typography>
                        <Link to={linkTo} >
                            <a>
                                <Typography color='primary' className='s14'>
                                    همه را ببین
                            </Typography>
                            </a>
                        </Link>
                    </Grid>
                </Box>
                <HorizontalSlider Component={SliderItem} items={items} />
            </Box>

    )
}