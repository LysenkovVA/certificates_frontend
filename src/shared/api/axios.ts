import { IUser } from "@/entities/User";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import axios from "axios";

const $api = axios.create({
    baseURL: __API__,
});

/**
 * К каждому запросу добавляем авторизацию
 */
$api.interceptors.request.use(
    (config) => {
        const item = localStorage.getItem(USER_LOCALSTORAGE_KEY);

        if (item) {
            const user = JSON.parse(item) as IUser;

            if (user?.token) {
                config.headers.set("Authorization", `Bearer ${user?.token}`);
                console.log("set auth header");
            }
        }

        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

export default $api;
