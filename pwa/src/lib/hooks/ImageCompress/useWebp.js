import { useEffect, useState } from "react";



export default function useWebp(files, percentToReduceSize) {
    
    const [processing, setProcessing] = useState(false);
    
    const [result, setResult] = useState([]);

    useEffect(() => {
        if (files && files.length > 0) {
            setProcessing(true);
            ResizeFiles(files, percentToReduceSize)
                .then(newFiles => {
                    // setProcessing(false);
                    setResult(newFiles);
                }).finally(() => {
                    setProcessing(false);
                });
        }
    }, [files])

    return [processing, result];
}

export function ResizeFiles(files, percentToReduceSize) {
    return new Promise((resolve, reject) => {
        let returnFiles = [];
        for (let file of files) {
            processFile(file, percentToReduceSize).then(newFile => {

                returnFiles = [...returnFiles, newFile];

                if (returnFiles.length == files.length) {

                    resolve(returnFiles);

                }
            });
        }
    })
}


function processFile(file, sizeInPercent) {
    if (!file) {
        return;
    }



    // Load the data into an image
    return new Promise(function (resolve, reject) {
        let rawImage = new Image();

        rawImage.addEventListener("load", function () {
            resolve(rawImage);
        });

        rawImage.src = URL.createObjectURL(file);
    })
        .then(function (rawImage) {
            // Convert image to webp ObjectURL via a canvas blob
            return new Promise(function (resolve, reject) {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext("2d");
                canvas.width = rawImage.width * sizeInPercent;
                canvas.height = rawImage.height * sizeInPercent;
                // canvas.width = sizeInPercent;
                // canvas.height = rawImage.height * (sizeInPercent / rawImage.width);
                ctx.drawImage(rawImage, 0, 0,canvas.width,canvas.height);

                canvas.toBlob(function (blob) {
                    resolve(new File([blob], file.name,{type : "image/webp"}));
                }, "image/webp");
            });
        });

}

