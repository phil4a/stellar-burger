import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderTotalPrice = ({ total }) => {
	return (
		<div className="text text_type_digits-medium text_type_main-medium">
			<span className="pr-2">{total}</span>
			<CurrencyIcon type="primary" />
		</div>
	);
};

export default OrderTotalPrice;
