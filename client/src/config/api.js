const configuredApiOrigin = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL;
const apiOrigin = configuredApiOrigin ?? (import.meta.env.DEV ? "http://localhost:5000" : "");

export const API_BASE_URL = apiOrigin.replace(/\/$/, "");
export const BOT_API_URL = import.meta.env.VITE_BOT_API_URL ?? (import.meta.env.DEV ? "http://localhost:8000/predict" : "");

export const getApiUrl = (path) => {
	if (!API_BASE_URL) {
		throw new Error(
			"The production API is not configured. Set VITE_API_URL in the Vercel project."
		);
	}
	return `${API_BASE_URL}${path}`;
};

export const getAuthConfig = () => {
	const token = localStorage.getItem("accessToken");
	return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const getArrayResponse = (data, endpoint) => {
	if (Array.isArray(data)) return data;

	console.error(`Expected an array response from ${endpoint}:`, data);
	throw new Error(`Expected an array response from ${endpoint}`);
};
