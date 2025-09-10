import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const fetchReady = async () => {
    try {
        const response = await axios.get(BASE_URL + '/myMusic/ready');
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        console.log("ERROR:", err);
        // toast.error(err.response?.data?.ERROR || "Something went wrong");
        return;
    }
}