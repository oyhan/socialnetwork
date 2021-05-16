import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import isBrowser from '../../nextjs/utility';

export default function useLocation() {
    const getDefault = ()=>{
        if(isBrowser){
            var savedLocation = JSON.parse(localStorage.getItem("location"));
            return savedLocation || {latitude: 0 , longitude : 0};
        }
        return  {latitude: 0 , longitude : 0};
    }
    const [pos, setPos] = useState(getDefault());
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
    function errors(err) {
    }
    const success = (pos) => {
        var crd = pos.coords;
        localStorage.setItem("location",JSON.stringify({latitude :crd.latitude,longitude:crd.longitude}))
        setPos(crd);
       
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
