import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../services/auth/auth-slice';
import { Link, useNavigate } from 'react-router-dom';
import { Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-form.module.css';

const LoginForm = () => {
	const navigate = useNavigate();
	const { isAuthChecked } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [value, setValue] = useState('');
	const onChange = (e) => {
		setValue(e.target.value);
	};
	const [passwordValue, setPasswordValue] = useState('');
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const inputRef = useRef(null);
	const onIconClick = () => {
		setIsPasswordVisible(!isPasswordVisible);
		setTimeout(() => inputRef.current.focus(), 0);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const accessToken = localStorage.getItem('accessToken');
		dispatch(login({ accessToken, email: value, password: passwordValue }));
	};

	useEffect(() => {
		if (isAuthChecked) {
			navigate('/', { replace: true });
		}
	}, [isAuthChecked, navigate]);

	return (
		<div className={styles.login}>
			<form className={styles.form}>
				<h1 className="text text_type_main-medium mb-6">Вход</h1>
				<EmailInput
					onChange={onChange}
					value={value}
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
					name={'name'}
					error={false}
					ref={inputRef}
					onIconClick={onIconClick}
					errorText={'Ошибка'}
					size={'default'}
					extraClass="mb-6"
				/>
				<Button htmlType="button" type="primary" size="medium" extraClass="" onClick={onSubmit}>
					Войти
				</Button>
			</form>
			<div className="mt-20">
				<div className={`mb-4 ${styles.line}`}>
					<p className="text text_type_main-default text_color_inactive">
						Вы — новый пользователь?
					</p>
					<Link className={`text text_type_main-default ${styles.link}`} to="/register">
						Зарегистрироваться
					</Link>
				</div>
				<div className={styles.line}>
					<p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
					<Link className={`text text_type_main-default ${styles.link}`} to="/forgot-password">
						Восстановить пароль
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
