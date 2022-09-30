import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [submit, setSubmit] = useState("");
  const [search, setSearch] = useState("");
  const [recipies, setRecipies] = useState(null);
  const [recipiesLocal, setRecipiesLocal] = useState([]);
  const [filtered, setFiltered] = useState([])
  const [show, setShow] = useState(false)
  const [spread, setSpread] = useState(false)

  let submitCopy = submit;
  useEffect(() => {
    setTimeout(() => {
      axios
        .get("https://www.themealdb.com/api/json/v1/1/search.php?s=Pie")
        .then((res) => {
          setRecipies(res.data.meals);
        });
      }, 300);
    }, []);

  if( recipies === null ){
    return;
  } else {
    localStorage.setItem('fullList', JSON.stringify([...recipies]))
  }

  const submitHandler = () => {
    setSubmit(search);
    setSearch("");
  };
  if (recipies === null) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <h2 className="col-12 mt-3 text-center">Loading...</h2>
        </div>
      </div>
    );
  }

  const toLocal = e => {
    // IF NULL
    if (JSON.parse(localStorage.getItem("liked")) === null) {
      localStorage.setItem("liked", JSON.stringify([]))
    }
    // SELECTING
    const fromLocal = JSON.parse(localStorage.getItem("liked"))
    const selected = fromLocal.find(obj => obj.idMeal === e.target.value)


    if(selected === undefined) {
      // IF DOES NOT EXIST
      const recipe = recipies.find(obj => obj.idMeal === e.target.value)
      const newRecipe = {...recipe, show:false, spread:false}
      const toLocal = [
        ...fromLocal, newRecipe];
      localStorage.setItem("liked", JSON.stringify(toLocal))

    } else if (selected.idMeal === e.target.value) {



      
      // IF EXISTS
      const afterFilter = fromLocal.filter(obj => obj.idMeal !== e.target.value)
      localStorage.setItem("liked", JSON.stringify(afterFilter))
    };
  }



  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-6 mt-3">
          <div className="input-group mb-3">
            <input
              type="text"
              value={search}
              className="form-control"
              placeholder="Search for recipe"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary bg-dark text-white"
              type="button"
              value={submit}
              onClick={submitHandler}
            >
              Search
            </button>
          </div>
          <ul className="list-group col-12 mt-5">
            {recipies?.filter(name => name.strMeal.toLowerCase().includes(submitCopy.toLowerCase()))
            .map(recipe => submitCopy === '' ? null :
              <li className="list-group-item" key={recipe.idMeal}>
                  <div className="mt-2 d-flex justify-content-between align-items-center px-2">
                    <h4>{recipe.strMeal}</h4>
                    <div className="image-wrap"><img src={recipe.strMealThumb} alt="" /></div>
                  </div>
                  {recipe.show === false ? <button className="btn btn-outline-dark btn-sm" onClick={toLocal} value={recipe.idMeal}>Like Me Baby</button> : <button className="btn btn-outline-dark btn-sm px-4" onClick={toLocal} value={recipe.idMeal}>Oh... Baby!</button>}
                  <ul className="list-group mt-4">
                    <li className="list-group-item"> <p>{recipe.strInstructions}</p></li>
                    <li className="list-group-item">{recipe.strIngredient1} / {recipe.strMeasure1}</li>
                    <li className="list-group-item">{recipe.strIngredient2} / {recipe.strMeasure2}</li>
                    <li className="list-group-item">{recipe.strIngredient3} / {recipe.strMeasure3}</li>
                    <li className="list-group-item">{recipe.strIngredient4} / {recipe.strMeasure4}</li>
                    <li className="list-group-item">{recipe.strIngredient5} / {recipe.strMeasure5}</li>
                  </ul>
                </li>
              )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
