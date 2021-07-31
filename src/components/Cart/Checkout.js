import classes from './Checkout.module.css';
import { useRef, useState } from 'react';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
	const [formInputsValdity, setFormInputsValdity] = useState({
		name: true,
		street: true,
		city: true,
		postalCode: true,
	});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostal = postalInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredPostalIsValid = isFiveChars(enteredPostal);
		const enteredCityIsValid = !isEmpty(enteredCity);

		setFormInputsValdity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			postalCode: enteredPostalIsValid,
			city: enteredCityIsValid,
		});

		const formIsValid =
			enteredNameIsValid &&
			enteredStreetIsValid &&
			enteredPostalIsValid &&
			enteredCityIsValid;

		if (!formIsValid) {
			return;
		}

		props.onSubmit({
			name: enteredName,
			street: enteredStreet,
			city: enteredCity,
			postalCode: enteredPostal,
		});
	};

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div
				className={`${classes.control} ${
					formInputsValdity.name ? '' : classes.invalid
				}`}>
				<label htmlFor='name'>Your Name</label>
				<input ref={nameInputRef} type='text' id='name' />
				{!formInputsValdity.name && <p>Please enter a valid name</p>}
			</div>
			<div
				className={`${classes.control} ${
					formInputsValdity.street ? '' : classes.invalid
				}`}>
				<label htmlFor='street'>Street</label>
				<input ref={streetInputRef} type='text' id='street' />
				{!formInputsValdity.street && (
					<p>Please enter a valid street name</p>
				)}
			</div>
			<div
				className={`${classes.control} ${
					formInputsValdity.postalCode ? '' : classes.invalid
				}`}>
				<label htmlFor='postal'>Postal Code</label>
				<input ref={postalInputRef} type='text' id='postal' />
				{!formInputsValdity.postalCode && (
					<p>Please enter a valid postal number (format: 12345)</p>
				)}
			</div>
			<div
				className={`${classes.control} ${
					formInputsValdity.city ? '' : classes.invalid
				}`}>
				<label htmlFor='city'>City</label>
				<input ref={cityInputRef} type='text' id='city' />
				{!formInputsValdity.city && <p>Please enter a valid city name</p>}
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
