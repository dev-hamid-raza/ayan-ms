import { useState } from 'react';
import axios from 'axios';

interface PostState<T, P> {
	data: T | null;
	loading: boolean;
	error: string | null;
	postData: (params: P) => Promise<T>;
}

export default function usePostFn<T, P = unknown>(
	postFunction: (params: P) => Promise<T>
): PostState<T, P> {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const postData = async (params: P) => {
		setLoading(true);
		setError(null);
		try {
			const result = await postFunction(params);
			setData(result);
			return result;
		} catch (err) {
			let errorMsg = 'Something went wrong';

			if (axios.isAxiosError(err)) {
				errorMsg = err.response?.data?.message || errorMsg;
			}

			setError(errorMsg);
			return Promise.reject(errorMsg);
		} finally {
			setLoading(false);
		}
	};

	return { data, loading, error, postData };
}