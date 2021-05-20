import { useEffect, useState } from "react"
import { HttpClient } from "../infrastructure/HttpClient"
import { javaUrl } from "../infrastructure/Urls"

export default function useFraudData() {
    const [data, setData] = useState([])

    const getAssignmentType = (assignmentTypeStatus) => {
        if (assignmentTypeStatus === 1) return "دوبرگی"
        if (assignmentTypeStatus === 2) return "تسلیمی"
        if (assignmentTypeStatus === 3) return "خودداری"
    }

    useEffect(() => {
        HttpClient.Get(`${javaUrl}/api/infrigments/get-all`)
            .then(result => {
                result.map(r => {
                    let date = new Date(r.date);
                    let persianDate = date.toLocaleDateString("fa-IR");
                    let time = date.toLocaleTimeString("fa-IR");
                    r.persianDate = persianDate;
                    r.time = time;
                    r.assignmentType = getAssignmentType(r.assignmentType);
                })
                setData(result);
            })
    }, [])

    return data;
}