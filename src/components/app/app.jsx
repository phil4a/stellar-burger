import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsFromServer } from '../../services/ingredients-slice';
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
import Layout from '../layout/layout';

import IngredientDetails from '../modals/ingredient-details/ingredient-details';
import Modal from '../modals/modal/modal';

import AppHeader from '../app-header/app-header';

const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;

	const dispatch = useDispatch();
	const ingredientsStatus = useSelector((state) => state.ingredients.status);

	useEffect(() => {
		if (ingredientsStatus === 'idle') {
			dispatch(getIngredientsFromServer());
		}
	}, [dispatch, ingredientsStatus]);
	return (
		<>
			<AppHeader />
			<Routes location={background || location}>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/ingredients/:id" element={<IngredientDetails />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
			{background && (
				<Routes>
					<Route
						path="/ingredients/:ingredientId"
						element={
							<Modal>
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
