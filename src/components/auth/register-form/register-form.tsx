import React, { useState, useRef } from 'react';
import { useAppDispatch } from '../../../services/store';
import { registration } from '../../../services/auth/auth-slice';
import { Link } from 'react-router-dom';
import { Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register-form.module.css';

const RegisterForm: React.FC = () => {
	const dispatch = useAppDispatch();

	const [emailValue, setEmailValue] = useState<string>('');
	const [nameValue, setNameValue] = useState<string>('');
	const [passwordValue, setPasswordValue] = useState<string>('');
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const nameRef = useRef<HTMLInputElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmailValue(e.target.value);
	};
	const onIconClick = () => {
		setIsPasswordVisible(!isPasswordVisible);
		setTimeout(() => inputRef.current?.focus(), 0);
	};
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(registration({ name: nameValue, email: emailValue, password: passwordValue }));
	};

	return (
		<div className={styles.register}>
			<form className={styles.form} onSubmit={onSubmit}>
				<h1 className="text text_type_main-medium mb-6">Регистрация</h1>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={(e) => setNameValue(e.target.value)}
					value={nameValue}
					name={'name'}
					error={false}
					ref={nameRef}
					errorText={'Ошибка'}
					size={'default'}
					extraClass="mb-6"
				/>
				<EmailInput
					onChange={onChangeEmail}
					value={emailValue}
					name={'email'}
					isIcon={false}
					extraClass="mb-6"
				/>
				<Input
					type={isPasswordVisible ? 'text' : 'password'}
					placeholder={'Пароль'}
					onChange={(e) => setPasswordValue(e.target.value)}
					icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
					value={passwordValue}
					name={'password'}
					error={false}
					ref={inputRef}
					onIconClick={onIconClick}
					errorText={'Ошибка'}
					size={'default'}
					extraClass="mb-6"
				/>
				<Button htmlType="submit" type="primary" size="medium" extraClass="">
					Зарегистрироваться
				</Button>
			</form>
			<div className="mt-20">
				<div className={styles.line}>
					<p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
					<Link className={`text text_type_main-default ${styles.link}`} to="/login">
						Войти
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RegisterForm;
