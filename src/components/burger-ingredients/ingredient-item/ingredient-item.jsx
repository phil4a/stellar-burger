import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientItem = ({ name, price, image, type, ...props }) => {
	return (
		<li style={{ textAlign: 'center' }} {...props}>
			<img className="pl-4 pr-4" src={image} alt={name} />
			<div className="text text_type_digits-default pt-1 pb-1" style={{ display: 'inline-flex' }}>
				<span className="pr-2">{price}</span>
				<CurrencyIcon type="primary" />
			</div>
			<p className="text text_type_main-default pl-2 pr-2">{name}</p>
		</li>
	);
};

export default IngredientItem;
