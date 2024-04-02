import { useSelector } from 'react-redux';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.css';
import propTypes from 'prop-types';

const OrderDetails = () => {
	const orderNumber = useSelector((state) => state.currentOrder.orderNumber);
	const getOrderStatus = useSelector((state) => state.currentOrder.status);
	return (
		<div className={styles.body}>
			<h2 className={`${styles.title} text text_type_digits-large mb-8`}>
				{getOrderStatus === 'loading' ? '...' : getOrderStatus === 'failed' ? '😩' : orderNumber}
			</h2>
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
OrderDetails.propTypes = {
	orderNumber: propTypes.number.isRequired,
};

export default OrderDetails;
