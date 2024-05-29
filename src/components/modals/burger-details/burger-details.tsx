import React from 'react';
import styles from './burger-details.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type Props = {};

const BurgerDetails = (props: Props) => {
	return (
		<div className={styles.body}>
			<h3 className={`${styles.orderNumber} text text_type_digits-default mb-10`}>#034533</h3>
			<h2 className="text text_type_main-medium mb-3">Black Hole Singularity острый бургер</h2>
			<p className={`${styles.status} text text_type_main-default mb-15`}>Выполнен</p>
			<h2 className="text text_type_main-medium mb-6">Состав:</h2>
			<ul className={`${styles.orderList} mb-10`}>
				<li className={`${styles.ingredient} text text_type_main-default`}>
					<div className={styles.circle}>
						<img
							className={styles.ingredientImg}
							src="https://code.s3.yandex.net/react/code/bun-01.png"
							alt=""
						/>
					</div>
					<p className={styles.ingredientTitle}>Флюоресцентная булка R2-D3</p>
					<div className={styles.ingredientInfo}>
						<span className="text text_type_digits-default">2</span>x
						<span className="text text_type_digits-default">20</span>
						<CurrencyIcon type="primary" />
					</div>
				</li>
				<li className={`${styles.ingredient} text text_type_main-default`}>
					<div className={styles.circle}>
						<img
							className={styles.ingredientImg}
							src="https://code.s3.yandex.net/react/code/meat-03.png"
							alt=""
						/>
					</div>
					<p className={styles.ingredientTitle}>Филе Люминесцентного тетраодонтимформа</p>
					<div className={styles.ingredientInfo}>
						<span className="text text_type_digits-default">1</span>x
						<span className="text text_type_digits-default">300</span>
						<CurrencyIcon type="primary" />
					</div>
				</li>
				<li className={`${styles.ingredient} text text_type_main-default`}>
					<div className={styles.circle}>
						<img
							className={styles.ingredientImg}
							src="https://code.s3.yandex.net/react/code/sauce-03.png"
							alt=""
						/>
					</div>
					<p className={styles.ingredientTitle}>Соус традиционный галактический</p>
					<div className={styles.ingredientInfo}>
						<span className="text text_type_digits-default">1</span>x
						<span className="text text_type_digits-default">30</span>
						<CurrencyIcon type="primary" />
					</div>
				</li>
				<li className={`${styles.ingredient} text text_type_main-default`}>
					<div className={styles.circle}>
						<img
							className={styles.ingredientImg}
							src="https://code.s3.yandex.net/react/code/sp_1.png"
							alt=""
						/>
					</div>
					<p className={styles.ingredientTitle}>Плоды фалленианского дерева</p>
					<div className={styles.ingredientInfo}>
						<span className="text text_type_digits-default">1</span>x
						<span className="text text_type_digits-default">80</span>
						<CurrencyIcon type="primary" />
					</div>
				</li>

				<li className={`${styles.ingredient} text text_type_main-default`}>
					<div className={styles.circle}>
						<img
							className={styles.ingredientImg}
							src="https://code.s3.yandex.net/react/code/sp_1.png"
							alt=""
						/>
					</div>
					<p className={styles.ingredientTitle}>Плоды фалленианского дерева</p>
					<div className={styles.ingredientInfo}>
						<span className="text text_type_digits-default">1</span>x
						<span className="text text_type_digits-default">80</span>
						<CurrencyIcon type="primary" />
					</div>
				</li>

				<li className={`${styles.ingredient} text text_type_main-default`}>
					<div className={styles.circle}>
						<img
							className={styles.ingredientImg}
							src="https://code.s3.yandex.net/react/code/sp_1.png"
							alt=""
						/>
					</div>
					<p className={styles.ingredientTitle}>Плоды фалленианского дерева</p>
					<div className={styles.ingredientInfo}>
						<span className="text text_type_digits-default">1</span>x
						<span className="text text_type_digits-default">80</span>
						<CurrencyIcon type="primary" />
					</div>
				</li>

				<li className={`${styles.ingredient} text text_type_main-default`}>
					<div className={styles.circle}>
						<img
							className={styles.ingredientImg}
							src="https://code.s3.yandex.net/react/code/sp_1.png"
							alt=""
						/>
					</div>
					<p className={styles.ingredientTitle}>Плоды фалленианского дерева</p>
					<div className={styles.ingredientInfo}>
						<span className="text text_type_digits-default">1</span>x
						<span className="text text_type_digits-default">80</span>
						<CurrencyIcon type="primary" />
					</div>
				</li>
			</ul>

			<div className={styles.footer}>
				<p className="text text_type_main-default text_color_inactive">Вчера, 13:50</p>
				<div className={styles.price}>
					<p className="text text_type_digits-default">900</p>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</div>
	);
};

export default BurgerDetails;
