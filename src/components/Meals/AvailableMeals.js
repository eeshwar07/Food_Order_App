import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const [DUMMY_MEALS, setDUMMY_MEALS] = useState([]);

  async function fetchData() {
    const response = await fetch(
      "https://react-foodapp-71ad4-default-rtdb.firebaseio.com/itemslist.json"
    );

    const data = await response.json();

    for (let x in data) {
      // console.log(data[x]);
      // return data[x];
      let DUMMY_MEAL = [];
      data[x].map((val) =>
        DUMMY_MEAL.push({
          id: val.id,
          name: val.name,
          description: val.description,
          price: val.price,
        })
      );
      console.log(DUMMY_MEAL);
      setDUMMY_MEALS(DUMMY_MEAL);
      // return DUMMY_MEALS;
    }

    // console.log(data);
  }
  console.log(DUMMY_MEALS);

  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
