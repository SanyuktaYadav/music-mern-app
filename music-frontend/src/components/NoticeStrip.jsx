import { useEffect, useState } from "react";
import { fetchReady } from "../actions/readyAction";

const NoticeStrip = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const response = await fetchReady();
            if (response.status === 200) {
                setVisible(false);
            }
        }
        fetch();
    }, []);

    if (!visible) return null;

    return (
        <div
            className="fixed top-0 left-0 w-full z-50 text-black py-2 px-4 shadow-md flex items-center justify-center"
            style={{ backgroundColor: "rgba(255, 235, 59, 0.9)" }}
        >
            <p className="text-sm font-medium">
                ⏳ This app is hosted on Render Free Tier.
                The API may take up to <strong>50 seconds</strong> to respond.
            </p>
            <button
                onClick={() => setVisible(false)}
                className="absolute right-4 text-black font-bold text-lg hover:text-red-600 cursor-pointer"
                aria-label="Close"
            >
                x
            </button>
        </div>
    );
}

export default NoticeStrip;
