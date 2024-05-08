import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const Protected = ({ onlyUnAuth = false, component }) => {
	// isAuthChecked это флаг, показывающий что проверка токена произведена
	// при этом результат этой проверки не имеет значения, важно только,
	// что сам факт проверки имел место.
	const { isAuthChecked, user } = useSelector((store) => store.auth);

	const location = useLocation();

	//Разобраться
	// if (!isAuthChecked) {
	// 	// Запрос еще выполняется
	// 	// Выводим прелоадер в ПР
	// 	// Здесь возвращается просто null для экономии времени

	// 	return null;
	// }

	if (onlyUnAuth && user.name) {
		// Пользователь авторизован, но роут предназначен для неавторизованного пользователя
		// Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
		console.log('пользователь авторизован и роут для неавторизованного пользователя');
		const { from } = location.state || { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	if (!onlyUnAuth && user.name === '') {
		// Пользователь не авторизован, но роут предназначен для авторизованного пользователя
		return <Navigate to="/login" state={{ from: location }} />;
		console.log('пользователь не авторизован и роут для авторизованного пользователя');
	}

	// !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя
	return component;
	console.log('Пользователь авторизован и роут для авторизованного пользователя');
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => <Protected onlyUnAuth={true} component={component} />;
