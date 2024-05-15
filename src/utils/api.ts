const API_URL = 'https://norma.nomoreparties.space/api';

interface IRefreshResponse {
	success: boolean;
	refreshToken?: string;
	accessToken?: string;
}

interface FetchOptions extends RequestInit {
	headers: {
		[key: string]: string;
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

export const refreshToken = (): Promise<IRefreshResponse> => {
	return fetch(`${API_URL}/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	}).then(checkResponse<IRefreshResponse>);
};

export const fetchWithRefresh = async (
	endpoint: string,
	options: FetchOptions,
): Promise<unknown> => {
	const url = `${API_URL}/${endpoint}`;
	try {
		const res = await fetch(url, options);
		const data = await checkResponse(res);
		return data;
	} catch (err) {
		if (err instanceof Error) {
			if (err.message === 'jwt expired') {
				const refreshData = await refreshToken();
				if (!refreshData.success) {
					return Promise.reject(refreshData);
				}
				if (refreshData.refreshToken) {
					localStorage.setItem('refreshToken', refreshData.refreshToken);
				}
				if (refreshData.accessToken) {
					localStorage.setItem('accessToken', refreshData.accessToken);
				}
				options.headers = options.headers || {}; // Проверка инициализации headers
				options.headers.authorization = refreshData.accessToken || ''; // Обновляем токен в заголовке
				const res = await fetch(url, options); // Повторный запрос с новым токеном
				return await checkResponse(res);
			} else {
				return Promise.reject(err);
			}
		}
	}
};

export const fetchForgotPassword = (email: string): Promise<unknown> => {
	const request: IForgotPasswordRequest = { email };
	return fetchWithRefresh('password-reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('accessToken') || '',
		},
		body: JSON.stringify(request),
	});
};

export const fetchResetPassword = (password: string, token: string): Promise<unknown> => {
	const request: IResetPasswordRequest = { password, token };
	return fetchWithRefresh('password-reset/reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('accessToken') || '',
		},
		body: JSON.stringify(request),
	});
};
