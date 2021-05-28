import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';


const useStyle = makeStyles((theme) => ({
    root: {
        margin : '5px 0',
        // display: 'flex',
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


export default function VerticalSlider({ items ,title , Component ,componentProps }) {
    

    const classes = useStyle();

    return (
        <>
            {/* <Grid container > */}
                <Grid container direction='column' justify='center' alignItems='center' className={classes.root} >
                    {
                        items.map((i, index) =>
                            <Component {...componentProps}  {...i} key={index} />
                        )
                    }

                </Grid>
            {/* </Grid> */}
        </>
    )

}