import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const getInvoices = async () => {
    try {
        const response = await axios.get(`${API_URL}/invoices`, {
            body: {
                token: API_TOKEN,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error("Error:", error);
    }
}
