import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";
import api from "../middleware";

export const logSongPlay = async (payload) => {
    try {
        const response = await api.post(BASE_URL + '/myMusic/songHistory/save', { ...payload },
            { withCredentials: true });
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        toast.error(err.response?.data?.ERROR || "Something went wrong");
    }
}

export const fetchSongHistory = async () => {
    try {
        const response = await api.get('/myMusic/songHistory/all');
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        console.log("ERROR:", err);
        // toast.error(err.response?.data?.ERROR || "Something went wrong");
        return;
    }
}
