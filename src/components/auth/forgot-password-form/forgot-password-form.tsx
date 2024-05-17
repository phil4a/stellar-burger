import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchForgotPassword } from '../../../utils/api';
import { setForgotPassword } from '../../../services/auth/auth-slice';

import { useDispatch } from 'react-redux';

import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password-form.module.css';

const ForgotPasswordForm: React.FC = () => {
	const dispatch = useDispatch();

	const [emailValue, setEmailValue] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setEmailValue(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		fetchForgotPassword(emailValue).then((response) => {
			if (response.success) {
				dispatch(setForgotPassword(true));
				navigate('/reset-password', { state: { from: 'forgot-password' } });
			}
			setIsLoading(false);
		});
	};

	return (
		<div className={styles.forgotPassword}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>

				<EmailInput
					onChange={onChangeEmail}
					placeholder="Укажите e-mail"
					value={emailValue}
					name={'email'}
					isIcon={false}
					extraClass="mb-6"
				/>
				<Button
					htmlType="submit"
					type="primary"
					size="medium"
					extraClass=""
					disabled={isLoading || !emailValue}>
					{isLoading ? 'Отправка...' : 'Восстановить'}
				</Button>
			</form>
			<div className="mt-20">
				<div className={styles.line}>
					<p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
					<Link className={`text text_type_main-default ${styles.link}`} to="/login">
						Войти
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ForgotPasswordForm;
