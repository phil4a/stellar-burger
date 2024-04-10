import { Routes, Route } from 'react-router-dom';

import { Home, NotFound, Register, Login, ForgotPassword, ResetPassword } from '../../pages';
import Layout from '../layout/layout';

import AppHeader from '../app-header/app-header';

const App = () => {
	return (
		<>
			<AppHeader />
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
};

export default App;
