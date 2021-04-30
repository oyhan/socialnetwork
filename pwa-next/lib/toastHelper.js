import { toast } from "react-toastify";
import Waiting from "../components/BackDrop/Waiting";


export default function Toast(message) {

    toast.dark(<Waiting message={message || "درحال ارسال اطلاعات"} />, {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
    })
}