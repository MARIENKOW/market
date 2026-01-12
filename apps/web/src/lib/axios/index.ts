import axios from "axios";

export const $BaseApi = axios.create({
    baseURL: process.env.SERVER_API,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});
