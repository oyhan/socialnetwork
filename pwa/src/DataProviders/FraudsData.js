import { useEffect, useState } from 'react';
import { HttpClient } from '../infrastructure/HttpClient';
import { numberWithCommas } from '../infrastructure/normalizations';
import { camundaUrl } from '../infrastructure/Urls';
import useLastProcessId from './useLastProcessId';

export default function useFraudData(inspectors) {
    
    const [data, setData] = useState([]);
    const pdid = useLastProcessId();

    function getData(url, inspector) {
        var processes = [];
        return HttpClient.Get(`${url}`)
            .then(response => {
                const processInstanceIds = response.map(r => r.rootProcessInstanceId);
                return HttpClient
                    .Get(`${camundaUrl}/engine-rest/history/variable-instance?variableName=RequesterModel&deserializeValues=false&processDefinitionId=${pdid}`).
                    then(result => {
                        result = result.filter(r => processInstanceIds.includes(r.processInstanceId) && r.value);
                        result.map(r => {
                            const value = JSON.parse(r.value);
                            const fraudDate = new Date(value.fraudDateTime).toLocaleDateString("fa-IR");
                            const totalFraudsCost = value.frauds.map(f => Number(f.fraudCost))
                                .reduce((total, f) => total + f, 0);
                            const totalFraudsCode = value.frauds.map(f => f.fraudCode).join();
                            
                            processes.push({
                                vehicleCode: value.vehicleCode,
                                plateNumber: value.plateNumber,
                                vehicleType: value.vehicleType,
                                fraudDate: fraudDate,
                                driverFullname: `${value.name} ${value.lastName}`,
                                frauds: value.frauds,
                                fraudCode: totalFraudsCode,
                                fraudCost: numberWithCommas(totalFraudsCost),
                                fraudTime: value.fraudTime,
                                date: value.fraudDateTime,
                                // inspector: `${inspector && `${inspector.firstName} ${inspector.lastName}`}`,
                                inspector: value.camundaUserFullName,
                                agancy: value.agancy,
                                locationAddress: value.locationAddress,
                                assignmentType: value.assignmentType,
                            })
                        })
                        processes = processes.sort((a, b) => {
                            

                            return toLongValue(b.date) - toLongValue(a.date)
                        })
                        
                        return processes;
                    })
            })

    }

    const toLongValue = (dateString) => {
        return new Date(dateString).valueOf()
    }
    useEffect(() => {
        var frauds = [];
        const doFetch = async () => {
            if (inspectors && inspectors.length > 0) {
                for (var inspector of inspectors) {
                    const url = `${camundaUrl}/engine-rest/history/process-instance?startedBy=${inspector.id}`
                    var processes = await getData(url, inspector)
                    frauds = [...frauds, ...processes]
                }
                setData(frauds);
            }
            else {
                const url = `${camundaUrl}/engine-rest/history/process-instance?processDefinitionKey=Infringment.New`;
                var processes = await getData(url, inspector)
                setData(processes);
            }
        }
        doFetch();
    }, [pdid, inspectors])
    return data;
}
