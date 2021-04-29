import { Search } from "@material-ui/icons";
import { useHttpClient } from "../../lib/BrowserHttpClient";
import InputRenderer from "../../lib/InputRenderer";

export default function useSearchBobo(term) {

    const [waitingUsers,users,errorUsers] =  useHttpClient(`http://localhost:12089/Profile/search/${term}`,"Get",r=>r.response.users)

    const [waitingPlaces,places,errorPlaces] = useHttpClient(`http://localhost:12089/place/search/${term}`,"Get",r=>r.response)
    
    return [waitingUsers||waitingPlaces , [...users,...places] , {errorUsers , errorPlaces}  ] ;

    
}

