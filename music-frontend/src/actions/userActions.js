import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import api from "../middleware";

export const login = async (payload) => {
    try {
        const response = await axios.post(BASE_URL + '/myMusic/auth/login', { ...payload },
            { withCredentials: true });
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        toast.error(err.response?.data?.ERROR || "Something went wrong");
    }
}

export const logout = async () => {
    try {
        const response = await axios.post(BASE_URL + "/myMusic/auth/logout", {}, { withCredentials: true });
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        console.log("ERROR:", err);
        // toast.error(err.response?.data?.ERROR || "Something went wrong");
        return;
    }
}

export const register = async (payload) => {
    try {
        const response = await axios.post(BASE_URL + '/myMusic/auth/register', { ...payload },
            { withCredentials: true });
        if (response.status === 200) {
            // toast.success(response.data.message);
            return response;
        }
    } catch (err) {
        console.log("ERROR:", err);
        // toast.error(err.response?.data?.ERROR || "Something went wrong");
        return;
    }
}

export const changePassword = async (payload) => {
    try {
        const response = await axios.patch(BASE_URL + '/myMusic/auth/changePassword', { ...payload },
            { withCredentials: true });
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        toast.error(err.response?.data?.ERROR || "Something went wrong");
    }
}

export const fetchAllUsers = async (payload) => {
    try {
        const response = await api.post('/myMusic/users/all', { ...payload });
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        console.log("ERROR:", err);
        // toast.error(err.response?.data?.ERROR || "Something went wrong");
        return;
    }
}