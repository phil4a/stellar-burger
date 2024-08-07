import { useAppSelector } from '../../../services/store';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Spinner from '../../../images/spinner.svg';
import styles from './order-details.module.css';
import { Status } from '../../../utils/types';

const OrderDetails = (): JSX.Element => {
	const { orderNumber } = useAppSelector((state) => state.currentOrder);
	const { status } = useAppSelector((state) => state.currentOrder);

	return (
		<div className={styles.body}>
			{status === Status.LOADING ? (
				<img src={Spinner} className={styles.spinner} alt="" />
			) : (
				<>
					<h2 className={`${styles.title} text text_type_digits-large mb-8`}>{orderNumber}</h2>
					<h3 className="text text_type_main-medium">идентификатор заказа</h3>
					<div className={styles.check}>
						<CheckMarkIcon type={'primary'} />
					</div>

					<p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
					<p className="text text_type_main-default text_color_inactive">
						Дождитесь готовности на орбитальной станции
					</p>
				</>
			)}
		</div>
	);
};

export default OrderDetails;
