import axios from 'axios';

const API_URL = '/api/proxy';

export const getListInstall = async () => {
    try {
        const response = await axios.post(API_URL, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Log the response for debugging
        console.log("Response:", response);
        if (response.headers['content-type'].includes('application/json')) {
            const data = response.data;

            // Ensure the data is an array
            return data.instalaciones;
        } else {
            console.error("Error: Response is not JSON");
            return [];
        }
    }
    catch (error) {
        console.error("Error:", error);
        return [];
    }
};