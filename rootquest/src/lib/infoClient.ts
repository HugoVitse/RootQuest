import axios, { AxiosError } from "axios";

export async function fetchUsername() {
    try {
        const response = await axios.post("/api/infoClient");
        return(response.data.username);
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching username:", error.message);
        }
    }
};
