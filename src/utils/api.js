const API_URL = 'https://norma.nomoreparties.space/api';

export function checkResponse(res) {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const refreshToken = () => {
	return fetch(`${API_URL}/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	}).then(checkResponse);
};

export const fetchWithRefresh = async (endpoint, options = {}) => {
	const url = `${API_URL}/${endpoint}`;
	try {
		const res = await fetch(url, options);
		const data = await checkResponse(res);
		return data;
	} catch (err) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}
			localStorage.setItem('refreshToken', refreshData.refreshToken);
			localStorage.setItem('accessToken', refreshData.accessToken);
			options.headers.authorization = refreshData.accessToken; // Обновляем токен в заголовке
			const res = await fetch(url, options); // Повторный запрос с новым токеном
			return await checkResponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};

export const fetchForgotPassword = (email) => {
	return fetchWithRefresh('password-reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify({ email }),
	});
};

export const fetchResetPassword = (password, token) => {
	return fetchWithRefresh('password-reset/reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify({ password, token }),
	});
};
