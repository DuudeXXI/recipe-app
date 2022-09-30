import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Main = () => {
  const [recipies, setRecipies] = useState(null);
  console.log(recipies);
  useEffect(() => {
    setTimeout(() => {
      axios
        .get("https://www.themealdb.com/api/json/v1/1/search.php?s=Pie")
        .then((res) => {
          setRecipies(res.data.meals);
        });
    }, 1000);
  }, []);

  if (recipies === null) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <h2 className="col-12 mt-3 text-center">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h2 className="col-12 mt-3 text-center">Recipies</h2>
        <ul className="list-group col-7 mt-5">
          {recipies?.map((recipe) => (
              <li className="list-group-item d-flex w-100 justify-content-between align-items-center" key={recipe.idMeal}>
                <h5>{recipe.strMeal}</h5>
              <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary btn-sm">
                Spread
              </button>
              <button className="btn btn-outline-dark btn-sm">
                Like me bitch
              </button>
              </div>
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;
