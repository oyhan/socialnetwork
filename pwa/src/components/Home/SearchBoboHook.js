import { useHttpClient } from "../../lib/BrowserHttpClient";

export default function useSearchBobo(term,searchIn) {
    
    // if (!term) return [false,[],{}];
    const [waitingUsers,users,errorUsers] =  useHttpClient(`/Profile/search/${term}`,"Get",r=>r.response.users)

    const [waitingPlaces,places,errorPlaces] = useHttpClient(`/place/search/${term}/${searchIn}`,"Get",r=>r.response)
    
    return [waitingUsers||waitingPlaces , [...users,...places.filter(p=>!p.isCity)] , {errorUsers , errorPlaces}  ] ;

    
}

