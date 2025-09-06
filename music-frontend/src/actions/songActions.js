import api from "../middleware"

export const fetchPreviewSongs = async () => {
    try {
        const response = await api.get('/myMusic/song/previewSongs');
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        console.log("ERROR:", err);
        // toast.error(err.response?.data?.ERROR || "Something went wrong");
        return;
    }
}

export const fetchAllSongs = async (payload) => {
    try {
        const response = await api.post('/myMusic/song/all', { ...payload });
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        console.log("ERROR:", err);
        // toast.error(err.response?.data?.ERROR || "Something went wrong");
        return;
    }
}

export const fetchSongById = async (id) => {
    try {
        const response = await api.get('/myMusic/song/getById/' + id)
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        console.log("ERROR:", err);
        // toast.error(err.response?.data?.ERROR || "Something went wrong");
        return;
    }
}

export const addSong = async (payload) => {
    try {
        const response = await api.post("/myMusic/song/add",
            payload,
            { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
        );
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        console.log("ERROR:", err);
        // toast.error(err.response?.data?.ERROR || "Something went wrong");
        return;
    }
}

export const deleteSong = async (songName) => {
    try {
        const response = await api.delete('/myMusic/song/delete',
            {
                data: {
                    songName // ✅ request body
                }
            });
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        console.log("ERROR:", err);
        // toast.error(err.response?.data?.ERROR || "Something went wrong");
        return;
    }
}

