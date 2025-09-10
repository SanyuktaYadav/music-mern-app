import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const NoticeStrip = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let didRespond = false;

        const fetch = async () => {
            try {
                const response = await axios.get(BASE_URL + "/myMusic/ready");
                if (response?.status === 200) {
                    didRespond = true;
                    setVisible(false);
                }
            } catch (error) {
                console.error("API Error:", error);
                setVisible(true);
            }
        };

        fetch();

        // Show notice if API doesn't respond in 3s
        const timeout = setTimeout(() => {
            if (!didRespond) {
                setVisible(true);
            }
        }, 3000);

        // Cleanup timeout on unmount
        return () => clearTimeout(timeout);
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
};

export default NoticeStrip;
