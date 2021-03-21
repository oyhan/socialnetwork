import { useState } from "react";





export default function usePica(image, newWidth) {

    const [image, setImage] = useState();

    function resizeWithPica() {
        var offScreenCanvas = document.createElement("canvas")
        offScreenCanvas.width = newWidth;
        offScreenCanvas.height = image.height * newWidth / image.width;

        return pica.resize(image, offScreenCanvas, {
            quality: 3,
            transferable: true
        }).then(() => {
            return offScreenCanvas.toDataURL();
        })


    }






}

