import React from 'react'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    btn: {
      color : theme.palette.common.white,
    },
}))

export default function ToolbarButton({children,...props}){
    const classes = useStyles();
    return (
        <Button {...props} className={classes.btn} >
            {children}
        </Button>
    )

}