import { CircularProgress } from "@material-ui/core";
import ShowOnMap from "../../components/ShowOnMap";
import { useHttpClient } from "../../lib/BrowserHttpClient";



export default function NearMe(){

    const [loading ,nearRestaurants , error] = useHttpClient("/restaurant/nearme","Get", r=>r.response);
    
    
    return (
        loading ? <CircularProgress /> :  <ShowOnMap places={nearRestaurants}/>
    )
}