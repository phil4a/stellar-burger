import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registration } from '../../../services/auth/register-slice';
import { Link } from 'react-router-dom';
import { Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register-form.module.css';

const RegisterForm = () => {
	const dispatch = useDispatch();

	const [emailValue, setEmailValue] = useState('');
	const [nameValue, setNameValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const nameRef = useRef(null);
	const inputRef = useRef(null);

	const onChangeEmail = (e) => {
		setEmailValue(e.target.value);
	};
	const onIconClick = () => {
		setIsPasswordVisible(!isPasswordVisible);
		setTimeout(() => inputRef.current.focus(), 0);
	};
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(registration({ name: nameValue, email: emailValue, password: passwordValue }));
	};

	return (
		<div className={styles.register}>
			<form className={styles.form}>
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
				<Button htmlType="button" type="primary" size="medium" extraClass="" onClick={onSubmit}>
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
