
import React, { useEffect, useState } from 'react';
import CamSDK from 'camunda-bpm-sdk-js'
import { Base64 } from 'js-base64';
import { camundaUrl } from '../infrastructure/Urls';
import { useHttpClient } from '../infrastructure/HttpClient';
var _ = require('lodash');

export default function useLastProcessId() {
    const [loading, data, error] =

    useHttpClient(`${camundaUrl}/engine-rest/process-definition?key=Infringment.New`, "Get");

    const [pid, setPid] = useState("");

    useEffect(() => {
        const grouped = Object.entries(data).map(([key, value]) => {

            return _.orderBy(value, ['version'], ['desc'])[0];
        })

        if (grouped.length > 0)
            setPid(grouped[0])

    }, [data])

    return pid;
}