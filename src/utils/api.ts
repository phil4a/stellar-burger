import { IIngredient } from '../utils/types';

import { API_URL } from '../constants/config';

interface IRefreshResponse {
	success: boolean;
	refreshToken?: string;
	accessToken?: string;
}

interface IForgotPasswordResponse extends Partial<IRefreshResponse> {
	message?: string;
}

interface FetchOptions extends RequestInit {
	method: string;
	headers: {
		'Content-Type': string;
		Authorization?: string;
	};
}

interface IForgotPasswordRequest {
	email: string;
}

interface IResetPasswordRequest {
	password: string;
	token: string;
}

export function checkResponse<T>(res: Response): Promise<T> {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const fetchIngredients = async (
	url: string,
): Promise<{ data: IIngredient[]; success: boolean }> => {
	const res = await fetch(`${API_URL}/${url}`);
	return checkResponse(res);
};

export const refreshToken = async (): Promise<IRefreshResponse> => {
	const res = await fetch(`${API_URL}/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	});
	return checkResponse<IRefreshResponse>(res);
};

export const fetchWithRefresh = async <T>(endpoint: string, options: FetchOptions): Promise<T> => {
	const url = `${API_URL}/${endpoint}`;
	try {
		const res = await fetch(url, options);
		const data = await checkResponse<T>(res);
		return data;
	} catch (err) {
		const errorMessage =
			typeof err === 'string' ? err : (err as { message?: string } | null)?.message;

		if (errorMessage === 'jwt expired') {
			const refreshData: IRefreshResponse = await refreshToken();
			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}
			if (refreshData.refreshToken) {
				localStorage.setItem('refreshToken', refreshData.refreshToken);
			}
			if (refreshData.accessToken) {
				localStorage.setItem('accessToken', refreshData.accessToken);
			}
			options.headers.Authorization = refreshData.accessToken; // Обновляем токен в заголовке
			const res = await fetch(url, options); // Повторный запрос с новым токеном
			return await checkResponse<T>(res);
		} else {
			return Promise.reject(err);
		}
	}
};

export const fetchForgotPassword = (email: string): Promise<IForgotPasswordResponse> => {
	const request: IForgotPasswordRequest = { email };
	return fetchWithRefresh<IForgotPasswordResponse>('password-reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(request),
	});
};

export const fetchResetPassword = (
	password: string,
	token: string,
): Promise<IForgotPasswordResponse> => {
	const request: IResetPasswordRequest = { password, token };
	return fetchWithRefresh<IForgotPasswordResponse>('password-reset/reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(request),
	});
};
