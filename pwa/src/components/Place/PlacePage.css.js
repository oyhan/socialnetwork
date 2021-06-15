import { makeStyles } from "@material-ui/core";

const usePlacePageStyles = makeStyles(theme => ({
    caption: {
        margin: '7px 0'
    },
    alignCenter: {
        alignSelf: 'center'
    },
    row: {
        margin: '5px 0',
        width : '100%',
    },
    map: {
        height: 100
    },
    row2 : {
        padding : '0 10px'

    },
    endingBlock  :{
        marginBottom : 50
    },
    mapSymbole: {
        background: 'url(/mapsymbole.png)',
        borderRadius: 15,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 105,
        margin: '5px 10px',
        cursor: 'pointer'
      },
   
}))


export default usePlacePageStyles;