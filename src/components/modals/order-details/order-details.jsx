import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.css';

const OrderDetails = () => {
	return (
		<div className={styles.body}>
			<h2 className={`${styles.title} text text_type_digits-large mb-8`}>034536</h2>
			<h3 className="text text_type_main-medium">идентификатор заказа</h3>
			<div className={styles.check}>
				<CheckMarkIcon />
			</div>
			<p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
			<p className="text text_type_main-default text_color_inactive">
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};

export default OrderDetails;
