import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

interface FetchState<T, P> {
	data: T | null;
	loading: boolean;
	error: string | null;
	refetch: (params?: P) => void;
}

export default function useFetchFn<T, P = unknown>(
	fetchFunction: (params?: P) => Promise<T>,
	initialParams?: P,
	dependencies: unknown[] = []
): FetchState<T, P> {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async (params?: P) => {
		setLoading(true);
		setError(null);
		try {
			// Use provided params if available, otherwise fall back to initialParams.
			const result = await fetchFunction(params ?? initialParams);
			setData(result);
		} catch (err) {
			const axiosError = err as AxiosError;
			let errorMsg = 'Something went wrong';
			if (axiosError.response?.data) {
				const resData = axiosError.response.data as { message?: string };
				errorMsg = resData.message || errorMsg;
			}
			setError(errorMsg);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData(initialParams);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies);

	return { data, loading, error, refetch: fetchData };
}