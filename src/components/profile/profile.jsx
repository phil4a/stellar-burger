import { useState, useRef } from 'react';
import {
	Input,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';

const Profile = () => {
	const [nameValue, setNameValue] = useState('');
	const [emailValue, setEmailValue] = useState('bob@example.com');

	const nameInputRef = useRef(null);

	const onNameIconClick = () => {
		setTimeout(() => nameInputRef.current.focus(), 0);
		alert('Name Icon Click Callback');
	};

	const onChangeEmail = (e) => {
		setEmailValue(e.target.value);
	};

	const [passwordValue, setPaswordValue] = useState('password');
	const onPasswordChange = (e) => {
		setPaswordValue(e.target.value);
	};

	return (
		<div className={styles.profile}>
			<ul className={styles.actions}>
				<li className="text text_type_main-medium pt-2 pb-4">Профиль</li>
				<li className="text text_type_main-medium pt-2 pb-4">История заказов</li>
				<li className="text text_type_main-medium pt-2 pb-4">Выход</li>
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
					onIconClick={onNameIconClick}
					errorText={'Ошибка'}
					size={'default'}
					disabled
					extraClass="mb-6"
				/>
				<EmailInput
					onChange={onChangeEmail}
					value={emailValue}
					name={'email'}
					placeholder="Логин"
					isIcon={true}
					extraClass="mb-6"
				/>
				<PasswordInput
					onChange={onPasswordChange}
					value={passwordValue}
					name={'password'}
					icon="EditIcon"
				/>
			</div>
		</div>
	);
};

export default Profile;
