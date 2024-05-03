import { httpClient as http } from "@/_infra/http/httpClient";
import { paths } from "@/_common/constants/constants";
import { getFixedValuesRangeData, getRangeNormalData } from "@/_infra/services/apiService";

describe("getRangeNormalData", () => {
    it('should return the min and max values from the API response when data is truthy', async () => {
        const mockData = { min: 1, max: 100 };
        http.get = jest.fn().mockResolvedValue({ data: mockData });

        const result = await getRangeNormalData();

        expect(http.get).toHaveBeenCalledWith(paths.rangeNormal);
        expect(result).toEqual(mockData);
    });

    it('should return default min and max values when API response is undefined', async () => {
        http.get = jest.fn().mockResolvedValue({ data: null });

        const result = await getRangeNormalData();

        expect(http.get).toHaveBeenCalledWith(paths.rangeNormal);
        expect(result).toEqual({ min: 0, max: 0 });
    });
});

describe('getFixedValuesRangeData', () => {
    it('should fetch fixed values range data successfully when API returns valid data', async () => {
        const mockData = {
            fixedValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]
        };

        http.get = jest.fn().mockResolvedValue({ data: mockData });

        const result = await getFixedValuesRangeData();

        expect(http.get).toHaveBeenCalledWith(paths.fixedValues);
        expect(result).toEqual(mockData.fixedValues);
    });

    it('should returns an empty array when data is null', async () => {
        http.get = jest.fn().mockResolvedValue({ data: null });

        const result = await getFixedValuesRangeData();

        expect(http.get).toHaveBeenCalledWith(paths.fixedValues);
        expect(result).toEqual([]);
    });
});

