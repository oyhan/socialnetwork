import React from 'react'
import { Button } from '@material-ui/core'

export default function ButtonBobo({children,...props}){

    return (
        <Button disableElevation variant='outlined'  {...props} >
            {children}
        </Button>
    )

}