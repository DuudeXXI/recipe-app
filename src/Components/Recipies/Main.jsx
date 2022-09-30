import { useEffect } from "react";
import { useState } from "react";

const Main = () => {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      const fromLocal = JSON.parse(localStorage.getItem("liked"));
      setList(fromLocal);
    }, 500);
  }, [list]);

  const toLocal = e => {
    // IF NULL
    if (JSON.parse(localStorage.getItem("liked")) === null) {
      localStorage.setItem("liked", JSON.stringify([]))
    }
    // SELECTING
    const fromLocal = JSON.parse(localStorage.getItem("liked"))
    const selected = fromLocal.find(obj => obj.idMeal === e.target.value)
    if (selected.idMeal === e.target.value) {
      // IF EXISTS
      const afterFilter = fromLocal.filter(obj => obj.idMeal !== e.target.value)
      localStorage.setItem("liked", JSON.stringify(afterFilter))
    }


  }

  return list === [] ? (
    <div className="container">
      <div className="row justify-content-center">
        <h2 className="col-12 mt-3 text-center">Loading...</h2>
      </div>
    </div>
  ) : (
    <div className="container">
      <div className="row justify-content-center">
        <h2 className="col-12 mt-3 text-center">List</h2>
        <ul className="list-group col-7 mt-5">
          {list?.map((recipe) => (
            recipe.show === false ? 
            <li
            className="list-group-item d-flex w-100 justify-content-between align-items-center"
            key={recipe.idMeal}
          >
            <h5>{recipe.strMeal}</h5>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary btn-sm">
                Spread cheeks
              </button>
            <button className="btn btn-outline-dark btn-sm px-4" onClick={toLocal} value={recipe.idMeal}>Oh... Baby, dont press me!</button>
            </div>
          </li> :
          null
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;


let kazkas = 2
let daryti_kazka = 5


// Paprastas
if (kazkas > 0) {
  console.log(daryti_kazka)
} else {
  console.log(`${kazkas} yra maziau negu 0`);
}
// Linijinis
kazkas > 0 ? console.log(daryti_kazka) : console.log(`${kazkas} yra maziau negu 0`);