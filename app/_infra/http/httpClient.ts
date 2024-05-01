import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const httpClient = {

    get: async (path: string) => {
        const res = await axios.get(baseUrl + path);
        if (res.status !== 200) {
            throw new Error("Failed to fetch data");
        }

        return res.data;
    },

    post: async (url: string, data: any) => {
        throw new Error('Not implemented yet');
    },
    put: async (url: string, data: any) => {
        throw new Error('Not implemented yet');
    },
    patch: async (url: string, data: any) => {
        throw new Error('Not implemented yet');
    },
    delete: async (url: string) => {
        throw new Error('Not implemented yet');
    },
};
