import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Preloader from '../components/preloader/preloader';

import propTypes from 'prop-types';

const ProtectedRoute = ({
	component,
	onlyUnAuth = false,
	onlyAfterForgot = false,
	allowUnauthAccess = false,
}) => {
	const { isAuthChecked, user, isForgotPassword } = useSelector((store) => store.auth);
	const location = useLocation();

	if (!isAuthChecked) {
		// Если проверка авторизации еще не завершена
		<Preloader />;
	}

	if (onlyUnAuth && user.name) {
		// Если пользователь авторизован, но маршрут только для неавторизованных
		const { from } = location.state || { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	if (onlyAfterForgot && !isForgotPassword) {
		// Если пользователь пытается перейти на reset-password без прохождения через forgot-password
		return <Navigate to="/forgot-password" />;
	}

	if (!onlyUnAuth && !allowUnauthAccess && user.name === '') {
		// Если маршрут для авторизованных, но пользователь не авторизован
		return <Navigate to="/login" state={{ from: location }} />;
	}

	// Возвращаем компонент, если все проверки пройдены
	return component;
};

ProtectedRoute.propTypes = {
	component: propTypes.node.isRequired,
	onlyUnAuth: propTypes.bool,
	onlyAfterForgot: propTypes.bool,
	allowUnauthAccess: propTypes.bool,
};

export const OnlyAuth = ({ component }) => <ProtectedRoute component={component} />;
export const OnlyUnAuth = ({ component }) => (
	<ProtectedRoute onlyUnAuth={true} component={component} />
);
export const OnlyAfterForgot = ({ component }) => (
	<ProtectedRoute onlyAfterForgot={true} allowUnauthAccess={true} component={component} />
);
