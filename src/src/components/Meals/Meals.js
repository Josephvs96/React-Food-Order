import React, { Fragment } from 'react';
import AvaiableMeals from './AvailableMeals';
import MealsSummery from './MealsSummery';
const Meals = () => {
	return (
		<Fragment>
			<MealsSummery />
			<AvaiableMeals />
		</Fragment>
	);
};

export default Meals;
