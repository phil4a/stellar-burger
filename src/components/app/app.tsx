import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { TODO_ANY } from '../../utils/types';

const App: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;

	const dispatch = useDispatch();
	const ingredientsStatus = useSelector((state: TODO_ANY) => state.ingredients.status);
	const { isAuthChecked } = useSelector((state: TODO_ANY) => state.auth);
	const { isFetchingUser } = useSelector((state: TODO_ANY) => state.auth);
	const { isFetchingIngredients } = useSelector((state: TODO_ANY) => state.ingredients);

	useEffect(() => {
		if (!isAuthChecked) {
			dispatch(checkAuth() as TODO_ANY);
		}
		if (ingredientsStatus === 'idle') {
			dispatch(getIngredientsFromServer() as TODO_ANY);
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
