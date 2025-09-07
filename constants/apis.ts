import { useUserStore } from "@/store/userstore";
import axios from "axios";


export const baseInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
})

baseInstance.interceptors.request.use(
    (config) => {
        const acessToken = useUserStore.getState().accessToken;
        if (acessToken) {
            config.headers.Authorization = `Bearer ${acessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// baseInstance.interceptors.response.use(
//     (response) => response,

//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             const refreshToken = useUserStore.getState().refreshToken;
//             try {
//                 const res = await baseInstance.post("/user/auth/refresh", { refresh_token: refreshToken });
//                 useUserStore.getState().setUser(
//                     res.data.id,
//                     res.data.name,
//                     res.data.email,
//                     res.data.photo,
//                     res.data.access_token,
//                     res.data.refresh_token
//                 );
//                 return baseInstance(originalRequest);
//             } catch (err) {
//                 useUserStore.getState().setNullUser();
//                 return Promise.reject(err);
//             }
//         } else {
//             useUserStore.getState().setNullUser();
//         }
//         return Promise.reject(error);
//     }
// )

baseInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = useUserStore.getState().refreshToken;
            if (refreshToken) {
                try {
                    const response = await axios.post("https://tours-backend-msss.onrender.com/staff/auth/refresh-token", 
                        { token: refreshToken }
                    );

                    useUserStore.getState().updateAccessToken(response.data.access_token);
                    originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
                    return baseInstance(originalRequest);
                } catch (refreshError) {
                    useUserStore.getState().setNullUser();
                    // window.location.replace('/sign-in');
                    return Promise.reject(refreshError);
                }
                useUserStore.getState().setNullUser();
                // window.location.replace('/sign-in');
            }
        }
        return Promise.reject(error);
    }
)