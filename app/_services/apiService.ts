import { httpClient as http } from "@/_infra/http/httpClient";
import { paths } from "@/_constants/constants";

export const getRangeNormalData = async () => {
    const { data } = await http.get(paths.rangeNormal);

    if (!data) {
        return { min: 0, max: 0 };
    }

    const { min, max } = data;
    return { min, max };
}

export const getFixedValuesRangeData = async () => {
    const { data } = await http.get(paths.fixedValues);

    if (!data) {
        return [];
    }

    const { rangeValues } = data;
    return { rangeValues };
}