import { Fragment } from 'react';
import mealsImage from '../../assets/meals.jpg';
import Classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
const Header = (props) => {
	return (
		<Fragment>
			<header className={Classes.header}>
				<h1>React Meals</h1>
				<HeaderCartButton onClick={props.onShowCart} />
			</header>
			<div className={Classes['main-image']}>
				<img src={mealsImage} alt='A table full of amazing food!' />
			</div>
		</Fragment>
	);
};

export default Header;
