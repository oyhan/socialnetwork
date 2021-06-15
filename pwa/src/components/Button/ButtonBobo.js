import { Button, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles(theme=>({
    root : {
        borderColor : 'black',
        height : 45
    }
}))

export default function ButtonBobo({children,...props}){
    const classes = useStyle();
    return (
        <Button disableElevation variant='outlined' classes={{root:classes.root}} {...props} >
            {children}
        </Button>
    )

}