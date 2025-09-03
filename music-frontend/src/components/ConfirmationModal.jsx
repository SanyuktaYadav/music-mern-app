import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { storeSongList } from "../redux/slices/songListSlice";

const ConfirmationModal = ({ open, handleCloseModal, data }) => {
    const dispatch = useDispatch();

    if (!open) {
        return null;
    }

    const handleConfirmDelete = async () => {
        try {
            const response = await axios.delete(BASE_URL + '/myMusic/song/delete',
                {
                    data: {
                        songName: data?.songName, // ✅ request body
                    },
                    withCredentials: true,
                });

            if (response.status === 200) {
                toast.success(response.data.message);
                const responseSong = await axios.get(BASE_URL + '/myMusic/song/all', { withCredentials: true });
                dispatch(storeSongList(responseSong?.data?.songs ?? []));
            }
            handleCloseModal();
        } catch (err) {
            toast.error(err.response?.data?.ERROR || "Something went wrong");
        }
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-400">
                <h2 className="text-xl font-semibold text-gray-800">
                    Are you sure you want to delete selected item?
                </h2>
                <div className="mt-4 flex justify-end space-x-4">
                    <button
                        onClick={handleCloseModal}
                        className="cursor-pointer px-4 py-2 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirmDelete}
                        className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div >
    )
}

export default ConfirmationModal;
