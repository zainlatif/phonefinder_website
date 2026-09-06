const apiOrigin = import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.DEV ? "http://localhost:5000" : "");

export const API_BASE_URL = apiOrigin.replace(/\/$/, "");
export const BOT_API_URL = import.meta.env.VITE_BOT_API_URL ?? (import.meta.env.DEV ? "http://localhost:8000/predict" : "");

export const getArrayResponse = (data) => {
	if (Array.isArray(data)) return data;
	if (Array.isArray(data?.products)) return data.products;
	if (Array.isArray(data?.items)) return data.items;
	return [];
};
