import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth/auth-slice';
import { useSelector } from 'react-redux';
import { refreshUser } from '../../services/auth/auth-slice';

import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile.module.css';

const Profile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);

	// const [nameValue, setNameValue] = useState('');
	// const [emailValue, setEmailValue] = useState('bob@example.com');
	const nameInputRef = useRef(null);

	const onNameIconClick = () => {
		setTimeout(() => nameInputRef.current.focus(), 0);
		alert('Name Icon Click Callback');
	};

	const onChangeEmail = (e) => {
		// setEmailValue(e.target.value);
	};

	// const [passwordValue, setPaswordValue] = useState('password');
	const onPasswordChange = (e) => {
		// setPaswordValue(e.target.value);
	};

	const handleLogoutClick = () => {
		dispatch(logout());
		navigate('/', { replace: true });
	};
	const handleRefreshUserClick = () => {
		dispatch(refreshUser({ name: user.name, email: user.email }));
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
					// onChange={}
					icon={'EditIcon'}
					value={user.name}
					name={'name'}
					error={false}
					ref={nameInputRef}
					onIconClick={onNameIconClick}
					errorText={'Ошибка'}
					size={'default'}
					disabled
					extraClass="mb-6"
				/>
				<EmailInput
					onChange={onChangeEmail}
					value={user.email}
					name={'email'}
					placeholder="Логин"
					isIcon={true}
					extraClass="mb-6"
				/>
				<PasswordInput
					onChange={onPasswordChange}
					// value={passwordValue}
					name={'password'}
					icon="EditIcon"
				/>
				<div className={styles.buttons}>
					<Button type="secondary" size="medium">
						Отмена
					</Button>
					<Button onClick={handleRefreshUserClick} type="primary" size="medium">
						Сохранить
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
