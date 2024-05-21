import { useSelector } from 'react-redux';
import { totalPriceSelector } from '../../../services/constructor-slice';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderTotalPrice: React.FC = () => {
	const totalPrice = useSelector(totalPriceSelector);
	return (
		<div className="text text_type_digits-medium text_type_main-medium">
			<span className="pr-2">{totalPrice}</span>
			<CurrencyIcon type="primary" />
		</div>
	);
};

export default OrderTotalPrice;
