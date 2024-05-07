import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth/auth-slice';
import { useSelector } from 'react-redux';
import { refreshUser } from '../../services/auth/auth-slice';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile.module.css';

const Profile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);

	const [nameValue, setNameValue] = useState(user.name);
	const [emailValue, setEmailValue] = useState(user.email);
	const [passwordValue, setPasswordValue] = useState('');
	const [nameDisabled, setNameDisabled] = useState(true);
	const [emailDisabled, setEmailDisabled] = useState(true);
	const [passwordDisabled, setPasswordDisabled] = useState(true);

	const nameInputRef = useRef(null);
	const emailInputRef = useRef(null);
	const passwordInputRef = useRef(null);

	const onNameIconClick = () => {
		setNameDisabled(false);
		setTimeout(() => nameInputRef.current.focus(), 0);
	};

	const onEmailIconClick = () => {
		setEmailDisabled(false);
		setTimeout(() => emailInputRef.current.focus(), 0);
	};
	const onPasswordIconClick = () => {
		setPasswordDisabled(false);
		setTimeout(() => passwordInputRef.current.focus(), 0);
	};

	const handleLogoutClick = () => {
		dispatch(logout());
		navigate('/', { replace: true });
	};

	const handleCancelClick = () => {
		setNameValue(user.name);
		setEmailValue(user.email);
		setPasswordValue('');
	};
	const handleRefreshUserClick = () => {
		dispatch(refreshUser({ name: nameValue, email: emailValue }));
	};

	return (
		<div className={styles.profile}>
			<ul className={styles.actions}>
				<li className="text text_type_main-medium pt-2 pb-4">Профиль</li>
				<li className="text text_type_main-medium pt-2 pb-4">История заказов</li>
				<li onClick={handleLogoutClick} className="text text_type_main-medium pt-2 pb-4">
					Выход
				</li>
				<p className="text text_type_main-default text_color_inactive pt-20">
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</ul>
			<div>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={(e) => setNameValue(e.target.value)}
					icon={'EditIcon'}
					value={nameValue}
					name={'name'}
					error={false}
					ref={nameInputRef}
					onBlur={() => setNameDisabled(true)}
					onIconClick={onNameIconClick}
					errorText={'Ошибка'}
					size={'default'}
					disabled={nameDisabled}
					extraClass="mb-6"
				/>
				<Input
					type={'email'}
					placeholder={'Email'}
					onChange={(e) => setEmailValue(e.target.value)}
					icon={'EditIcon'}
					value={emailValue}
					name={'email'}
					error={false}
					ref={emailInputRef}
					onBlur={() => setEmailDisabled(true)}
					onIconClick={onEmailIconClick}
					errorText={'Ошибка'}
					size={'default'}
					disabled={emailDisabled}
					extraClass="mb-6"
				/>
				<Input
					type={'password'}
					placeholder={'Password'}
					onChange={(e) => setPasswordValue(e.target.value)}
					icon={'EditIcon'}
					value={passwordValue}
					name={'password'}
					error={false}
					ref={passwordInputRef}
					onBlur={() => setPasswordDisabled(true)}
					onIconClick={onPasswordIconClick}
					errorText={'Ошибка'}
					size={'default'}
					disabled={passwordDisabled}
					extraClass="mb-6"
				/>

				<div className={styles.buttons}>
					<Button onClick={handleCancelClick} type="secondary" size="medium">
						Отмена
					</Button>
					<Button
						disabled={nameValue === user.name && emailValue === user.email}
						onClick={handleRefreshUserClick}
						type="primary"
						size="medium">
						Сохранить
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
