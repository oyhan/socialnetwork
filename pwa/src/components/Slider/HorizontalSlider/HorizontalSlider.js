import { Grid, makeStyles, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';
import React from 'react';


const useStyle = makeStyles((theme) => ({
    root: {

        display: 'flex',
        flexDirection: 'row',
        '-ms-overflow-style': 'none',  /* IE and Edge */
        'scrollbar-width': 'none',  /* Firefox */
        overflowY: 'hidden',
        '& > div': {
            marginRight: theme.spacing(1),
        },
        '&::-webkit-scrollbar' : {
            display: 'none',
          }
    },
    title : {
        marginBottom : theme.spacing(2),
    }
}))


export default function HorizontalSlider({ items ,title , Component }) {
    
    

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