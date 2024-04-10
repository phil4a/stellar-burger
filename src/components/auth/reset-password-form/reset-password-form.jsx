import { useState, useRef } from 'react';
import { request } from '../../../utils/request';
import { Link } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password-form.module.css';

const ResetPasswordForm = () => {
	const [passwordValue, setPasswordValue] = useState('');
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [codeValue, setCodeValue] = useState('');

	const passwordRef = useRef(null);
	const codeRef = useRef(null);

	const onIconClick = () => {
		setIsPasswordVisible(!isPasswordVisible);
		setTimeout(() => passwordRef.current.focus(), 0);
	};

	return (
		<div className={styles.resetPassword}>
			<form className={styles.form}>
				<h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
				<Input
					type={isPasswordVisible ? 'text' : 'password'}
					placeholder={'Введите новый пароль'}
					onChange={(e) => setPasswordValue(e.target.value)}
					icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
					value={passwordValue}
					name={'password'}
					error={false}
					ref={passwordRef}
					onIconClick={onIconClick}
					errorText={'Ошибка'}
					size={'default'}
					extraClass="mb-6"
				/>

				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					onChange={(e) => setCodeValue(e.target.value)}
					value={codeValue}
					name={'name'}
					error={false}
					ref={codeRef}
					errorText={'Ошибка'}
					size={'default'}
					extraClass="mb-6"
				/>
				<Button htmlType="button" type="primary" size="medium" extraClass="">
					Восстановить
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

export default ResetPasswordForm;
