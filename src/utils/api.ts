const API_URL = 'https://norma.nomoreparties.space/api';

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
		// [key: string]: string;
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

export const fetchWithRefresh = async (endpoint: string, options: FetchOptions): Promise<any> => {
	const url = `${API_URL}/${endpoint}`;
	try {
		const res = await fetch(url, options);
		const data = await checkResponse(res);
		return data;
	} catch (err) {
		if (err === 'jwt expired') {
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
			return await checkResponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};

export const fetchForgotPassword = (email: string): Promise<IForgotPasswordResponse> => {
	const request: IForgotPasswordRequest = { email };
	return fetchWithRefresh('password-reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: localStorage.getItem('accessToken') || '',
		},
		body: JSON.stringify(request),
	}).then((res) => res.json()) as Promise<IForgotPasswordResponse>;
};

export const fetchResetPassword = (
	password: string,
	token: string,
): Promise<IForgotPasswordResponse> => {
	const request: IResetPasswordRequest = { password, token };
	return fetchWithRefresh('password-reset/reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: localStorage.getItem('accessToken') || '',
		},
		body: JSON.stringify(request),
	});
};
