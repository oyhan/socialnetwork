import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useHttpClient } from '../../../lib/BrowserHttpClient';
import Post from '../../Post/Post';

export default function UserPosts({ userName }) {
    const [loading, data, error] = useHttpClient(`/Profile/GetUserTimelinePosts/${userName}/0/10`, "Get");
    return (
        <Grid container direction='column' justify='center' alignContent='center' >
            {
                loading  ? <Typography>loading</Typography> : error ? <Typography>{error}</Typography> :
                    data.map((p, index) => {
                        return (
                            <Post key={index} {...p} />
                        )
                    })
            }
        </Grid>
    )
}
