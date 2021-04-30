import { useHttpClient } from "../../lib/BrowserHttpClient";

export default function useSearchBobo(term) {

    const [waitingUsers,users,errorUsers] =  useHttpClient(`/Profile/search/${term}`,"Get",r=>r.response.users)

    const [waitingPlaces,places,errorPlaces] = useHttpClient(`/place/search/${term}`,"Get",r=>r.response)
    
    return [waitingUsers||waitingPlaces , [...users,...places] , {errorUsers , errorPlaces}  ] ;

    
}

