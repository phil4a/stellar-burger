export function checkResponse(res) {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка ${res.status}`);
}

export function request(endpoint, options = {}) {
	console.log(options);
	const API_URL = 'https://norma.nomoreparties.space/api';
	return fetch(`${API_URL}/${endpoint}`, options).then(checkResponse);
}
