import { Chip, Grid, makeStyles, Typography } from "@material-ui/core";
import { getRecentSearchHistory } from "../../helper/citySearchHelper";
import CitySearchResultItem from "./CitySearchResultItem";
const useStyles = makeStyles({
    search: {
        marginTop: 30
    },
    distance: {
        borderRadius: 0,
        marginTop: 13,

    },
    label: {
        padding: '0 4px',
        color: 'gray',
        fontSize: 12
    },
    chipRoot: {
        height: 24
    },
    locationIcon: {
        marginTop: 6
    },
    recentSearchWord: {
        color: 'rgba(159, 156, 156, 1)',
        fontSize: ': 19px !important',
        fontWeight: '400 !important',
    }
})


export default function RecentSearch({ handClickRecentSearch }) {
    const classes = useStyles();
    return (
        <div className={classes.search}>
            <Typography className={classes.recentSearchWord}>
                جستجوهای اخیر
            </Typography>
            <Grid container justify='space-between'>
                {getRecentSearchHistory().map(c =>
                    <CitySearchResultItem item={c} handClickRecentSearch={handClickRecentSearch} />
                )}


            </Grid>
        </div>
    )
}