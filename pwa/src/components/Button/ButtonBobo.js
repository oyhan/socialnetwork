import { Button } from '@material-ui/core'
import React from 'react'

export default function ButtonBobo({children,...props}){

    return (
        <Button disableElevation variant='outlined'  {...props} >
            {children}
        </Button>
    )

}