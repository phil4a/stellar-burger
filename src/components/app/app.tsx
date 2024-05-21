import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../services/store';
import { getIngredientsFromServer } from '../../services/ingredients-slice';
import { checkAuth } from '../../services/auth/auth-slice';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import {
	Home,
	NotFound,
	Register,
	Login,
	ForgotPassword,
	ResetPassword,
	ProfilePage,
} from '../../pages';

import { OnlyAuth, OnlyUnAuth, OnlyAfterForgot } from '../protected-route';
import Layout from '../layout/layout';
import Preloader from '../preloader/preloader';
import IngredientDetails from '../modals/ingredient-details/ingredient-details';
import Modal from '../modals/modal/modal';

import AppHeader from '../app-header/app-header';

//TODO 1. исправить ошибки в useSelector

const App: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;

	const dispatch = useAppDispatch();
	const ingredientsStatus = useSelector((state: RootState) => state.ingredients.status);
	const { isAuthChecked, accessToken, isFetchingUser } = useSelector(
		(state: RootState) => state.auth,
	);
	const { isFetchingIngredients } = useSelector((state: RootState) => state.ingredients);

	useEffect(() => {
		dispatch({
			type: 'asdad',
			payload: 'azcdfsdad',
		});
		if (!isAuthChecked && accessToken) {
			dispatch(checkAuth());
		}
		if (ingredientsStatus === 'idle') {
			dispatch(getIngredientsFromServer());
		}
	}, [dispatch, ingredientsStatus, isAuthChecked]);

	return isFetchingIngredients || isFetchingUser ? (
		<Preloader />
	) : (
		<>
			<AppHeader />
			<Routes location={background || location}>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/ingredients/:id" element={<IngredientDetails />} />
					<Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
					<Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
					<Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
					<Route
						path="/reset-password"
						element={<OnlyAfterForgot component={<ResetPassword />} />}
					/>
					<Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
			{background && (
				<Routes>
					<Route
						path="/ingredients/:ingredientId"
						element={
							<Modal onClose={() => navigate(-1)}>
								<IngredientDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	);
};

export default App;
