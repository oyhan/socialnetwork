import { CircularProgress, InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { useState } from "react";
import InputRenderer from "../../lib/InputRenderer";
import { PropType } from "../../lib/proptypes";
import SearchDialog from "../Dialog/SearchDialog";
import RestaurantSearchItem from "../Search/RestaurantSearchItem";
import UserSearchItem from "../Search/UserSearchItem";
import useSearchBobo from "./SearchBoboHook";

export default function SearchBobo(props) {

    const [term, setTerm] = useState("");
    const [loading, data, error] = useSearchBobo(term);
    




    const handleChange = (event) => {
        setTerm(event.target.value);
    }
    const isUser= (item)=>{
       return Object.keys(item).includes("isFollowing")
    }
   
    return (
        <>
            <SearchDialog {...props} >
                <InputRenderer
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search color="disabled" />
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleChange}
                    autocomplete="off" placeholder="جست‌وجوی بوبو" Type={PropType.Text}
                    Name="" fullWidth />
                {

                    loading ? <CircularProgress /> :

                        data.map((r, i) => {
                            if (isUser(r)) {
                                return <UserSearchItem {...r} key={i} />
                            }
                            return <RestaurantSearchItem {...r} key={i} />
                        })
                }
            </SearchDialog>



        </>
    )
}

