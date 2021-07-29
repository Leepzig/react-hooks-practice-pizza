import React from "react";
import Pizza from "./Pizza";

function PizzaForm( { updatePizzas, handleChange, newPizza, isEdit, updateEditedPizzas }) {




  const handleSubmit = (e) => {
    e.preventDefault()

    if (isEdit) {
      fetch("http://localhost:3001/pizzas/" + isEdit.id, {
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({...newPizza, vegetarian:newPizza.vegetarian})
    })
    .then(resp => resp.json())
    .then(data => updateEditedPizzas(data))
  } else {

    fetch("http://localhost:3001/pizzas", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(newPizza)
    })
    .then(resp => resp.json())
    .then(data => updatePizzas(data))
  }
}





  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            value={newPizza.topping}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <select className="form-control" name="size" value={newPizza.size} onChange={handleChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="veggy"
              checked={newPizza.vegetarian === true}
              onChange={handleChange}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="no veggy"
              checked={newPizza.vegetarian === false}
              onChange={handleChange}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
