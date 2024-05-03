import { httpClient as http } from "@/_infra/http/httpClient";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

describe("httpClient", () => {
    it('should successfully fetch data from the API when given a valid path', async () => {
        const path = '/valid-path';
        const responseData = { data: 'test data' };
        const response = { status: 200, data: responseData };

        axios.get = jest.fn().mockResolvedValue(response);

        const result = await http.get(path);

        expect(axios.get).toHaveBeenCalledWith(baseUrl + path);
        expect(result).toEqual(responseData);
    });

    it('should throw an error if the API is down or unreachable', async () => {
        const path = '/invalid-path';
        const response = { status: 500 };

        axios.get = jest.fn().mockResolvedValue(response);

        await expect(http.get(path)).rejects.toThrow("Failed to fetch data");
        expect(axios.get).toHaveBeenCalledWith(baseUrl + path);
    });
});
