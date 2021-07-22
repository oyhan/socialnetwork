import { makeStyles } from "@material-ui/core";

const usePlacePageStyles = makeStyles(theme => ({
    caption: {
        margin: '7px 0'
    },
    alignCenter: {
        alignSelf: 'center'
    },
    row: {
        margin: '7px 0',
        width: '100%',
    },
    map: {
        height: 100,
        margin : '10px 0',
        "& > div" :{
            borderRadius : 9
        }
    },
    row2: {
        padding: '0 10px'

    },
    endingBlock: {
        marginBottom: 30
    },
    mapSymbole: {
        background: 'url(/mapsymbole.png)',
        borderRadius: 9,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 105,
        margin: '4px 0px 18px 0px',
        cursor: 'pointer'
    },
    infoWrapper: {
        "& svg": {
            fontSize: 20,
            marginRight: 5,
            marginLeft:5
        }
    }
}))


export default usePlacePageStyles;