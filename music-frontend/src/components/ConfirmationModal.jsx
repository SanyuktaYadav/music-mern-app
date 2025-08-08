const ConfirmationModal = ({ open, handleCloseModal, data }) => {
    if (!open) {
        return null;
    }

    const handleConfirmDelete = () => {
        alert("Deleted selected " + data?.songName);
        handleCloseModal();
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
