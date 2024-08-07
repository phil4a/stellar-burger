import { useAppSelector } from '../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import Preloader from './preloader/preloader';

interface IProtectedRouteProps {
	component: React.ReactNode;
	onlyUnAuth?: boolean;
	onlyAfterForgot?: boolean;
	allowUnauthAccess?: boolean;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
	component,
	onlyUnAuth = false,
	onlyAfterForgot = false,
	allowUnauthAccess = false,
}) => {
	const { isAuthChecked, user, isForgotPassword } = useAppSelector((state) => state.auth);
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
	return <>{component}</>;
};

export const OnlyAuth: React.FC<IProtectedRouteProps> = ({ component }) => (
	<ProtectedRoute component={component} />
);
export const OnlyUnAuth: React.FC<IProtectedRouteProps> = ({ component }) => (
	<ProtectedRoute onlyUnAuth={true} component={component} />
);
export const OnlyAfterForgot: React.FC<IProtectedRouteProps> = ({ component }) => (
	<ProtectedRoute onlyAfterForgot={true} allowUnauthAccess={true} component={component} />
);
