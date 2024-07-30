import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { addIngredient, setBun, clearIngredients } from '../../services/constructor-slice';
import { increaseIngredientsCounter, resetCounters } from '../../services/ingredients-slice';

import { sendOrder } from '../../services/order-slice';

import Modal from '../modals/modal/modal';
import OrderDetails from '../modals/order-details/order-details';
import DraggedIngredient from './dragged-ingredient/dragged-ingredient';
import OrderTotalPrice from './order-total-price/order-total-price';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';

import { IIngredient } from '../../utils/types';

const BurgerConstructor: React.FC = (): JSX.Element => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const { user } = useSelector((store: RootState) => store.auth);
	const ingredients = useSelector((store: RootState) => store.burgerConstructor.ingredients);
	const { bun } = useSelector((store: RootState) => store.burgerConstructor);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOrderClick = () => {
		if (!user.name) {
			navigate('/login');
		} else {
			setIsModalOpen(true);
			const ingredientIds = ingredients.map((ingredient) => ingredient._id);
			if (bun) {
				ingredientIds.unshift(bun._id);
				ingredientIds.push(bun._id);
			}

			dispatch(sendOrder(ingredientIds)).then(() => {
				dispatch(clearIngredients());
				dispatch(resetCounters());
			});
		}
	};

	const [{ canDrop, itemType }, dropRef] = useDrop({
		accept: ['ingredient', 'bun'],
		drop(item: IIngredient) {
			if (item.type === 'bun') {
				dispatch(setBun(item));
				dispatch(increaseIngredientsCounter(item));
			} else {
				dispatch(addIngredient(item));
				dispatch(increaseIngredientsCounter(item));
			}
		},
		collect: (monitor) => ({
			canDrop: monitor.canDrop(),
			itemType: monitor.getItemType(),
		}),
	});

	const borderColor = canDrop && itemType === 'bun' ? '#4C4CFF' : 'transparent';
	const borderColorIngredients = canDrop && itemType !== 'bun' ? '#4C4CFF' : 'transparent';
	return (
		<section ref={dropRef} className={`${styles.section} pt-25 pl-4 pr-4`}>
			<div
				className={`${styles.bun} ${styles.topBunPlaceholder}`}
				style={{ borderColor: borderColor }}>
				{bun ? (
					<ConstructorElement
						type="top"
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image_mobile}
					/>
				) : (
					<div className={`${styles.dragPlaceholder} ${styles.topBunPlaceholder}`}>
						<p className="text text_type_main-default">Перенесите сюда булку</p>
					</div>
				)}
			</div>

			<div className={styles.ingredients} style={{ borderColor: borderColorIngredients }}>
				{ingredients.length ? (
					ingredients.map((ingredient: IIngredient, index: number) => (
						<DraggedIngredient
							key={ingredient.nanoid}
							ingredient={ingredient}
							id={ingredient.nanoid}
							index={index}
						/>
					))
				) : (
					<div className={`${styles.dragPlaceholder} ${styles.mainPlaceholder}`}>
						<p className="text text_type_main-default">Перенесите сюда ингредиенты</p>
					</div>
				)}
			</div>

			<div
				className={`${styles.bun} ${styles.bottomBunPlaceholder}`}
				style={{ borderColor: borderColor }}>
				{bun ? (
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image_mobile}
					/>
				) : (
					<div className={`${styles.dragPlaceholder} ${styles.bottomBunPlaceholder}`}>
						<p className="text text_type_main-default">Перенесите сюда булку</p>
					</div>
				)}
			</div>

			<div className={`${styles.actions} mt-4`}>
				<OrderTotalPrice />
				<Button
					htmlType="button"
					type="primary"
					size="large"
					extraClass="ml-10"
					onClick={handleOrderClick}
					disabled={!bun || !ingredients.length}>
					Оформить заказ
				</Button>

				{isModalOpen && (
					<Modal onClose={() => setIsModalOpen(false)}>
						<OrderDetails />
					</Modal>
				)}
			</div>
		</section>
	);
};

export default BurgerConstructor;
