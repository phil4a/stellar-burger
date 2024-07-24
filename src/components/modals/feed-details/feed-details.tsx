import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './feed-details.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const FeedDetails: React.FC = (): JSX.Element | null => {
	const { id } = useParams<{ id: string }>();

	return (
		<div className={styles.body}>
			<p className={`${styles.number} text text_type_digits-default mb-10`}>#034533</p>
			<h1 className="text text_type_main-medium mb-3">Black Hole Singularity острый бургер</h1>
			<p className={`${styles.status} text text_type_main-default mb-15`}>Выполнен</p>
			<h2 className="text text_type_main-medium mb-6">Состав:</h2>
			<ul className={`${styles.list} pr-6 mb-10`}>
				<li className={styles.item}>
					<div className={styles.ingredientImg}>
						<img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="bun" />
					</div>
					<h3 className={`${styles.ingredientName} text text_type_main-default`}>
						Флюоресцентная булка R2-D3
					</h3>
					<div className={styles.ingredientPrice}>
						<span className={`${styles.quantity} text text_type_digits-default`}>2</span>
						<span className="text text_type_main-default">x</span>
						<span className={`${styles.price} text text_type_digits-default`}>20</span>
						<CurrencyIcon type="primary" />
					</div>
				</li>
				<li className={styles.item}>
					<div className={styles.ingredientImg}>
						<img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="bun" />
					</div>
					<h3 className={`${styles.ingredientName} text text_type_main-default`}>
						Флюоресцентная булка R2-D3
					</h3>
					<div className={styles.ingredientPrice}>
						<span className={`${styles.quantity} text text_type_digits-default`}>2</span>
						<span className="text text_type_main-default">x</span>
						<span className={`${styles.price} text text_type_digits-default`}>20</span>
						<CurrencyIcon type="primary" />
					</div>
				</li>
				<li className={styles.item}>
					<div className={styles.ingredientImg}>
						<img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="bun" />
					</div>
					<h3 className={`${styles.ingredientName} text text_type_main-default`}>
						Флюоресцентная булка R2-D3
					</h3>
					<div className={styles.ingredientPrice}>
						<span className={`${styles.quantity} text text_type_digits-default`}>2</span>
						<span className="text text_type_main-default">x</span>
						<span className={`${styles.price} text text_type_digits-default`}>20</span>
						<CurrencyIcon type="primary" />
					</div>
				</li>
				<li className={styles.item}>
					<div className={styles.ingredientImg}>
						<img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="bun" />
					</div>
					<h3 className={`${styles.ingredientName} text text_type_main-default`}>
						Флюоресцентная булка R2-D3
					</h3>
					<div className={styles.ingredientPrice}>
						<span className={`${styles.quantity} text text_type_digits-default`}>2</span>
						<span className="text text_type_main-default">x</span>
						<span className={`${styles.price} text text_type_digits-default`}>20</span>
						<CurrencyIcon type="primary" />
					</div>
				</li>
				<li className={styles.item}>
					<div className={styles.ingredientImg}>
						<img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="bun" />
					</div>
					<h3 className={`${styles.ingredientName} text text_type_main-default`}>
						Флюоресцентная булка R2-D3
					</h3>
					<div className={styles.ingredientPrice}>
						<span className={`${styles.quantity} text text_type_digits-default`}>2</span>
						<span className="text text_type_main-default">x</span>
						<span className={`${styles.price} text text_type_digits-default`}>20</span>
						<CurrencyIcon type="primary" />
					</div>
				</li>
				<li className={styles.item}>
					<div className={styles.ingredientImg}>
						<img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="bun" />
					</div>
					<h3 className={`${styles.ingredientName} text text_type_main-default`}>
						Флюоресцентная булка R2-D3
					</h3>
					<div className={styles.ingredientPrice}>
						<span className={`${styles.quantity} text text_type_digits-default`}>2</span>
						<span className="text text_type_main-default">x</span>
						<span className={`${styles.price} text text_type_digits-default`}>20</span>
						<CurrencyIcon type="primary" />
					</div>
				</li>
				<li className={styles.item}>
					<div className={styles.ingredientImg}>
						<img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="bun" />
					</div>
					<h3 className={`${styles.ingredientName} text text_type_main-default`}>
						Флюоресцентная булка R2-D3
					</h3>
					<div className={styles.ingredientPrice}>
						<span className={`${styles.quantity} text text_type_digits-default`}>2</span>
						<span className="text text_type_main-default">x</span>
						<span className={`${styles.price} text text_type_digits-default`}>20</span>
						<CurrencyIcon type="primary" />
					</div>
				</li>
				<li className={styles.item}>
					<div className={styles.ingredientImg}>
						<img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="bun" />
					</div>
					<h3 className={`${styles.ingredientName} text text_type_main-default`}>
						Флюоресцентная булка R2-D3
					</h3>
					<div className={styles.ingredientPrice}>
						<span className={`${styles.quantity} text text_type_digits-default`}>2</span>
						<span className="text text_type_main-default">x</span>
						<span className={`${styles.price} text text_type_digits-default`}>20</span>
						<CurrencyIcon type="primary" />
					</div>
				</li>
			</ul>
			<div className={`${styles.summary} text text_type_main-default}`}>
				<span className="text text_type_main-default text_color_inactive">Вчера, 13:50</span>
				<div className={`${styles.total} text text_type_digits-default`}>
					<span className="text text_type_digits-default">100</span>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</div>
	);
};

export default FeedDetails;
