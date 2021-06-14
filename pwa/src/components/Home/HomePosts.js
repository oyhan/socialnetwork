import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import Post from '../Post/Post';
import AppDivider from '../Dividers/AppDivider';

const useStyle = makeStyles(theme => ({
    container: {
        marginBottom: 50
    }
}))
export default function HomePosts({ posts }) {

    const classes = useStyle();

    return (
        <Grid container direction='column' justify='center' className={classes.container} alignContent='center' >
            {
                posts.map((p, index) => {
                    return (
                        <>
                            <Post key={index} {...p} />

                            <AppDivider />
                        </>
                    )
                })
            }
        </Grid>
    )
}
