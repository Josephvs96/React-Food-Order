import React, { Fragment, useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';
import Checkout from './Checkout';

const Cart = (props) => {
	const [isCheckingOut, setIsCheckingOut] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const cartCtx = useContext(CartContext);

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem(item);
	};

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;
	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const onOrderHandler = (e) => {
		setIsCheckingOut(true);
	};

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		await fetch(
			'FIREBASE_DATABASE_API_URL',
			{
				method: 'POST',
				body: JSON.stringify({
					user: userData,
					orderedItems: cartCtx.items,
				}),
			}
		);
		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	};

	const modalActions = (
		<div className={classes.actions}>
			<button
				onClick={props.onHideCart}
				className={classes['button--alt']}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={onOrderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckingOut ? (
				<Checkout
					onSubmit={submitOrderHandler}
					onCancel={props.onHideCart}
				/>
			) : (
				modalActions
			)}
		</Fragment>
	);

	const isSubmittingModalContent = <p>Sending order data...</p>;
	const didSubmitModalContent = (
		<Fragment>
			<p>
				Thanks for your order! You will be contacted as soon yout food is
				ready
			</p>
			<div className={classes.actions}>
				<button
					onClick={props.onHideCart}
					className={classes['button--alt']}>
					Close
				</button>
			</div>
		</Fragment>
	);
	return (
		<Modal onHideModal={props.onHideCart}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
