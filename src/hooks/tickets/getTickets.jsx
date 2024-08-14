
import axios from "axios";

export const getTickets = async () => {
    try {
        const response = await axios.get("http://localhost:3001/tickets");
        return response.data;
    } catch (error) {
        console.error(error);
    }
    }
