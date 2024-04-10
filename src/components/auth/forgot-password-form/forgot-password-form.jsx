import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../../../utils/request';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password-form.module.css';

const ForgotPasswordForm = () => {
	const [emailValue, setEmailValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const onChangeEmail = (e) => {
		setEmailValue(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await request('password-reset', {
				method: 'POST',
				body: JSON.stringify({ email: emailValue }),
			});

			if (response.success) {
				console.log(emailValue);
				navigate('/reset-password', { state: { from: 'forgot-password' } });
				console.log(response);
			}
		} catch (error) {
			alert('Произошла ошибка при отправке запроса. Попробуйте повторить попытку позже.');
		} finally {
			setIsLoading(false);
		}
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
