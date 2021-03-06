import React, { useState, useEffect } from 'react';
import Card from '../UI/Card.js';
import MealItem from './MealItem/MealItem.js';

import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpErr, setHttpErr] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch('https://react-http-e25c6-default-rtdb.firebaseio.com/meals.json')

        if (res.status !== 200) {
          throw new Error('Some thing went wrong!')
        }

        const resData = await res.json();

        console.log('res data', resData)

        const loadedMeals = [];

        for (const key in resData) {
          loadedMeals.push({
            id: key,
            name: resData[key].name,
            description: resData[key].description,
            price: resData[key].price
          })
        }

        setMeals(loadedMeals)
        setIsLoading(false)

      } catch (err) {
        setIsLoading(false)
        setHttpErr(err.message)
      }
    } 

    fetchMeals()
}, [])

if (isLoading) {
  return <section className={classes['meals-loading']}>
    <p>Loading...</p>
  </section>
}

if (httpErr) {
  return <section className={classes['meals-error']}>
    <p>{httpErr}</p>
  </section>
}

const mealLists = meals.map(meal => <MealItem
  name={meal.name}
  description={meal.description}
  price={meal.price}
  key={meal.id}
  id={meal.id}
/>)

return <section className={classes.meals}>
  <Card>
    <ul>
      {mealLists}
    </ul>
  </Card>
</section>
}

export default AvailableMeals;