const API_URL = 'https://norma.nomoreparties.space/api';

export function checkResponse(res) {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export function request(endpoint, options = {}) {
	console.log(options);
	return fetch(`${API_URL}/${endpoint}`, options).then(checkResponse);
}

export const fetchForgotPassword = (email) => {
	return request('password-reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify({ email }),
	});
};

export const fetchResetPassword = (password, token) => {
	return request('password-reset/reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify({ password, token }),
	});
};
