import React from "react";

function Pizza( { pizza, editPizza }) {

 
  return (
    <tr>
      <td>{pizza.topping}</td>
      <td>{pizza.size}</td>
      <td>{pizza.vegetarian ? "Only veggies": "Meat too"}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={() => editPizza(pizza)}>
          Edit Pizza
        </button>
      </td>
    </tr>
  );
}

export default Pizza;
