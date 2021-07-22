import { Container, Divider, Slide, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Subject } from 'rxjs';
import { BrowserHttpClient } from "../../lib/BrowserHttpClient";
import InputRenderer from "../../lib/InputRenderer";
import { PropType } from "../../lib/proptypes";
import AppBar from "../AppBar/AppBar";
import ToolbarButton from "../Button/ToolBarButton";
import SearchDialog from "../Dialog/SearchDialog";
import CitySearchResultItem from "../Home/CitySearchResultItem";
import RestaurantSearchItem from "../Search/RestaurantSearchItem";

export default function SearchPlacePost({ onSelectPlace, open, handleWindow }) {
    console.log('open: ', open);
    const [query, setQuery] = useState("");
    const history = useHistory();
    // const [loading, places, error] = useHttpClient(`/place/search/${query}/undefined`, "Get", r => r.response);
    const [places, setPlaces] = useState([]);
    const handleClose = () => {
        handleWindow(false);
    };
    const rightIcon = <ToolbarButton onClick={handleClose} color='primary'   >
        <Typography color='textPrimary' >
            انصراف
         </Typography>
    </ToolbarButton>

    const onSelect = (place) => () => {
        onSelectPlace(place);
        handleWindow(false);
    }
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const handleInput = (e) => {
        BrowserHttpClient.Get(`/place/search/${e.target.value}/undefined`)
            .then(result => {
                if (result) {
                    setPlaces(result?.response);
                }
                else {
                    setPlaces([]); 
                }

            })
    }

    const toolbar = (<>
        <AppBar height={68} leftIcons={[<div style={{ width: 50 }}></div>]} appBarColor='transparent' short rightIcon={rightIcon} title='جستجو' />
        <Divider />

    </>)

    return (
        <>
            <SearchDialog
                toolbar={toolbar}
                open={open} handleWindow={handleWindow} TransitionComponent={Transition}>

                <Container>
                    <InputRenderer
                        onChange={handleInput}
                        autoFocus
                        autoComplete="off"
                        //  placeholder="رستوران‌ها، هتل‌ها، جاذبه‌های توریستی و ..."
                        Type={PropType.Text}
                        DisplayName="رستوران‌ها، هتل‌ها، جاذبه‌های توریستی و ..." fullWidth />

                </Container>

                <div>
                    {
                        places.filter(p => p.isCity).map(r => {
                            return (
                                <>
                                    <CitySearchResultItem variant item={r} handClickRecentSearch={onSelect} />
                                    <Divider style={{ margin: '-2px 0', marginRight: 15 }} />
                                </>
                            )
                        })
                    }
                    {
                        places.filter(p => !p.isCity).map((r, i) => {
                            return (<>
                                <RestaurantSearchItem place={r} key={i} handleClick={onSelect} />
                                <Divider style={{ margin: '-2px 0', marginRight: 15 }} />
                            </>)

                        })
                    }
                </div>
            </SearchDialog>
        </>
    )

}
