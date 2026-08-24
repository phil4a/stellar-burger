import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import { BrowserRouter } from 'react-router-dom';
import { store } from './services/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
);
