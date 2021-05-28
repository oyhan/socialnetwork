import { useHttpClient } from "../../lib/BrowserHttpClient";
import useLocation from "../../lib/hooks/location/useLocation";


export default function useHomeCity(showNearby) {
    console.log('showNearby: ', showNearby);
    const position = useLocation();

    const [loadingcityHomeData, cityHomeData, errors] = useHttpClient(`/location/current/${position.latitude}/${position.longitude}`, "Get", r => r.response);

    const savedLocation = JSON.parse(localStorage.getItem("homecity"));
    if (!showNearby && savedLocation) {
        return [loadingcityHomeData, savedLocation, errors]
    }

    return [loadingcityHomeData, cityHomeData, errors];


}