import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';


const useStyle = makeStyles((theme) => ({
    root: {

        display: 'flex',
        flexDirection: 'column',
        '-ms-overflow-style': 'none',  /* IE and Edge */
        'scrollbar-width': 'none',  /* Firefox */
        overflowY: 'hidden',
        '& > div': {
            // marginBottom: theme.spacing(1),
        },
        '&::-webkit-scrollbar' : {
            display: 'none',
          }
    },
    title : {
        marginBottom : theme.spacing(2),
    }
}))


export default function VerticalSlider({ items ,title , Component }) {
    

    const classes = useStyle();

    return (
        <>
            <Grid container >
                <div className={classes.root} >
                    {
                        items.map((i, index) =>
                            <Component  {...i} key={index} />
                        )
                    }

                </div>
            </Grid>
        </>
    )

}