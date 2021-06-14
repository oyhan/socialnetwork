import { useEffect, useState } from 'react';
import isBrowser from '../../nextjs/utility';

const defaultLocation = { latitude: 31.834989, longitude: 54.374296 };
export default function useLocation() {
    const getDefault = () => {
        var savedLocation = JSON.parse(localStorage.getItem("location"));

        if (!savedLocation) return defaultLocation;

        return savedLocation
        
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
        console.log('crd: ', crd);
        localStorage.setItem("location", JSON.stringify(defaultLocation))
        setPos(defaultLocation);

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
                            navigator.geolocation.getCurrentPosition(success, errors, options);
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
