import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

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
      let DUMMY_MEAL = [];
      data[x].map((val) =>
        DUMMY_MEAL.push({
          id: val.id,
          name: val.name,
          description: val.description,
          price: val.price,
        })
      );
      setDUMMY_MEALS(DUMMY_MEAL);
    }
  }

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
