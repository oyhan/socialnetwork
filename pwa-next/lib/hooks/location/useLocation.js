import Axios from 'axios';
import React, { useEffect, useState } from 'react';


export default function useLocation() {
    
    const [pos, setPos] = useState();



    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };


    function errors(err) {
        


    }

    const success = (pos) => {
        
        var crd = pos.coords;
        
        setPos(crd);

        // Axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${crd.latitude}&lon=${crd.longitude}&format=json`).then(response=>{
        //     const result = response.data;


        //     // setAddress(`${result.address.road},${result.address.city},${result.address.state}`);
        //     setAddress(`${result.display_name}`);
        // });
    }



    useEffect(() => {
        
        
        if (navigator.platform == 'iPhone') {

            navigator.geolocation.getCurrentPosition(success);
        } else
            if (navigator.geolocation) {
                navigator.permissions
                    .query({ name: "geolocation" })
                    .then(function (result) {
                        
                        if (result.state === "granted") {

                            //If granted then you can directly call your function here
                            navigator.geolocation.getCurrentPosition(success);
                        } else if (result.state === "prompt") {
                            navigator.geolocation.getCurrentPosition(success, errors, options);
                        } else if (result.state === "denied") {
                            //If denied then you have to show instructions to enable location
                        }
                        result.onchange = function () {
                                
                        };
                    });
            } else {
                alert("location not avaliable");
            }

    }, [])

    
    return pos;
    

}
