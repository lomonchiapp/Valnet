import axios from 'axios';

const API_URL = '/.netlify/functions/proxy';
const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const API_DIR = '/v1/ListInstall';
export const getListInstall = async () => {
    try {
        const response = await axios.post(`${API_URL}${API_DIR}`, {
            token: API_TOKEN,
        },{
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Log the response for debugging
        console.log("Response:", response);
        console.log("api url:", `${API_URL}${API_DIR}`);
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
}