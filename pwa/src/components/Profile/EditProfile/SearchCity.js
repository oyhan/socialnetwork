import { Box, Container, Divider, Grid, makeStyles, Typography } from "@material-ui/core"
import SearchInput from "../../Input/SearchInput";
import ToolbarButton from "../../Button/ToolBarButton";
import { BrowserHttpClient } from "../../../lib/BrowserHttpClient";
import { useState } from "react";

const useStyle = makeStyles((theme) => ({
    header: {
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        height: "60px"
    },
    body: {
        height: "100%",
        width: "100%",
        marginTop: '-17px',
        backgroundColor: 'white',
        borderTopRightRadius: "15px",
        borderTopLeftRadius: "15px"
    },
    searchInput: {
        backgroundColor: "#EAEAD8 !important",
        borderRadius: "11px !important",
        marginTop: "13px"
    },
    searchIcon: {
        padding: "0px !important",
        marginLeft: "6px",
    },
    svg: {
        width: "1.25em !important",
        height: "1.25em !important",
        color: 'rgba(159, 156, 156, 1)'
    },
    input: {
        marginLeft: "-10px",
    },
    inputRoot: {
        border: "0 !important",
        borderRadius: "inherit"
    },
    cansel: {
        textAlign: "center",
        alignSelf: "center",
        marginTop: "10px"
    },
    canselText: {
        fontSize: "19px",
        color: "#802143"
    },
    searchResult :{
        "& div" : {
            margin : '8px 0'
        }
    }
}));
export default function SearchCity({ handleSelectedCity, handleClose }) {
    const [city, setCity] = useState([]);

    const onChnage = (event) => {
        BrowserHttpClient.Get("/Location/Citys/" + event.target.value)
            .then(result => {

                setCity(result);
            })
            .catch(error => {

            })
    }
    const closeDialogHandle = () => {
        handleClose(false);
    }
    const classes = useStyle();
    return (
        <div style={{ height: "85vh" }}>
            <div className={classes.header}></div>
            <div className={classes.body}>
                <Grid container>
                    <Grid item xs={9} sm={9} style={{ paddingRight: "20px" }}>
                        <SearchInput
                            placeholder="زادگاه/شهر کنونی"
                            containerClassName={classes.searchInput}
                            searchIconClassName={classes.searchIcon}
                            svgClassName={classes.svg}
                            inputRootClassName={classes.inputRoot}
                            inputClassName={classes.input}
                            onChnage={onChnage}
                        ></SearchInput>
                    </Grid>
                    <Grid item xs={3} sm={3} className={classes.cansel}>
                        <ToolbarButton onClick={closeDialogHandle}>
                            <Typography className={classes.canselText}>انصراف</Typography>
                        </ToolbarButton>
                    </Grid>
                </Grid>
                <Divider style={{ margin: "5px 11px 5px 11px", paddingTop: "2px" }} />
                <Container>
                    <Box marginTop='18px' className={classes.searchResult}>
                        {city && city.map((c, i) => {
                            return (<Grid onClick={()=>handleSelectedCity(c)} container  >
                                <Typography className='s15'>
                                    {`${c.province}/${c.city}`}
                                </Typography>
                            </Grid>)
                        })}
                    </Box>
                </Container>

            </div>



        </div>
    )
}