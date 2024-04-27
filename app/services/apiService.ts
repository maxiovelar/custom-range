const { NEXT_PUBLIC_API_BASE_URL } = process.env;

export const getRangeValues = async (endpoint: string) => {
    const res = await fetch(NEXT_PUBLIC_API_BASE_URL + endpoint);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}