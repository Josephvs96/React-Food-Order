import { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvaiableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState(null);

	useEffect(() => {
		fetch(
			'FIREBASE_DATABASE_API_URL'
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Something went wrong!');
				}

				return response.json();
			})
			.then((data) => {
				const fetchedMeals = [];
				for (const key in data) {
					fetchedMeals.push({
						id: key,
						name: data[key].name,
						description: data[key].description,
						price: data[key].price,
					});
				}
				setMeals(fetchedMeals);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
				setHttpError(err.message);
			});
	}, []);

	if (isLoading) {
		return (
			<section className={classes.loading}>
				<p>Loading...</p>
			</section>
		);
	}

	if (httpError) {
		return (
			<section className={classes.error}>
				<p>{httpError}</p>
			</section>
		);
	}

	const mealsList = meals.map((meal) => (
		<MealItem key={meal.id} meal={meal} />
	));
	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvaiableMeals;
