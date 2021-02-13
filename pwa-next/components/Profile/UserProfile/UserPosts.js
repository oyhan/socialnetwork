import { Grid } from '@material-ui/core'
import React from 'react'
import Post from '../../Post/Post'

const posts = [
    {
        text : "یک روز دل انگیز در یزد",
        username : "rahiqi",
        month : "فروردین",
        year : "99",
        placeName : "طزرجان",
        likes : 24,
        medias : [{"url":"https://i.pinimg.com/564x/d2/95/7d/d2957d2c23f34099351befadaedad30e.jpg"}]
    },
    {
        text : "یک روز دل انگیز در یزد",
        username : "Fateme",
        month : "اردیبهشت",
        year : "85",
        placeName : "ده بالا",
        likes :12,
        medias : [{"url":"https://i.pinimg.com/originals/fc/f6/a2/fcf6a2435357d6770c675e37c623ad39.jpg"},
        {"url":"https://i.pinimg.com/originals/26/d8/0c/26d80c728501de3be6b0f861ab1eae19.jpg"}]
    },
    {
        text : "یک روز دل انگیز در یزد",
        username : "Soosan",
        month : "فروردین",
        year : "99",
        placeName : "طزرجان",
        likes : 23,
        medias : [{"url":"http://www.zazzle.com/mount_rainier_washington_postcard-239836003661561774?CMPN=addthis&lang=en&rf=238288644791066257"},
        {"url":"https://i.pinimg.com/564x/02/4f/2e/024f2e50354e30d0dab82cd846125e2f.jpg"}]
    },
    {
        text : "یک روز دل انگیز در یزد",
        username : "shashaie",
        month : "فروردین",
        year : "99",
        placeName : "طزرجان",
        likes : 123,
        medias : [{"url":"https://miro.medium.com/max/3000/1*MI686k5sDQrISBM6L8pf5A.jpeg"},
        {"url":"https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"}]
    },
    
]

export default function UserPosts(){
    
    return(
        <Grid container direction='column' justify='center' alignContent='center' >
            {
                posts.map((p,index)=>{
                    return(
                        <Post key={index} {...p}/>
                    )
                })
            }
        </Grid>
    )
}