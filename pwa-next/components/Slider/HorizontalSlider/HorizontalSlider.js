import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import SliderItem from '../SliderItem/SliderItem';
import Link from 'next/link'


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


export default function HorizontalSlider({ items ,title }) {

    const classes = useStyle();

    return (
        <>
            <Grid justify='space-between' direction='row' spacing={0} container className={classes.title} >
                <Typography component='h4'>
                    {title}
                 </Typography>
                <Link href="/seeall" >
                    <a>
                        <Typography color='primary'>
                            همه را ببین
                        </Typography>
                    </a>
                </Link>
            </Grid>
            <Grid container >
                <div className={classes.root} >
                    {
                        items.map((i, index) =>
                            <SliderItem cl {...i} key={index} />
                        )
                    }

                </div>
            </Grid>
        </>
    )

}