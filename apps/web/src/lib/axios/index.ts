import axios from "axios";

export const $BaseApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_API,
    withCredentials: true,
    // headers: {
    //     "Content-Type": "application/json",
    // },
});
