import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import Classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
	const [btnIsBump, setBtnIsBump] = useState(false);
	const cartCtx = useContext(CartContext);
	const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0);

	const btnClasses = `${Classes.button} ${btnIsBump ? Classes.bump : ''}`;

	useEffect(() => {
		if (cartCtx.items.length === 0) {
			return;
		}
		setBtnIsBump(true);

		const timer = setTimeout(() => {
			setBtnIsBump(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [cartCtx.items]);

	return (
		<button onClick={props.onClick} className={btnClasses}>
			<span className={Classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={Classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
