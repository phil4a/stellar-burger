import { useAppSelector } from '../../../services/store';
import { totalPriceSelector } from '../../../services/constructor/constructor-slice';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderTotalPrice: React.FC = () => {
	const totalPrice = useAppSelector(totalPriceSelector);
	return (
		<div className="text text_type_digits-medium text_type_main-medium">
			<span className="pr-2">{totalPrice}</span>
			<CurrencyIcon type="primary" />
		</div>
	);
};

export default OrderTotalPrice;
