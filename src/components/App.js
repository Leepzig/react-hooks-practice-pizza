import React, { useEffect, useState } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([])
  const [newPizza, setNewPizza] = useState({
    topping:"",
    size:"small",
    vegetarian:false
  })
  const [isEdit, setIsEdit] = useState(null)

  useEffect(() => {
    
    fetch("http://localhost:3001/pizzas")
    .then(resp=>resp.json())
    .then(data => setPizzas(data))
  }, [])

  const updatePizzas = pizza => {
    setPizzas([...pizzas, pizza])
  }

  const updateEditedPizzas = (editedPizza) => {
    const newPizzaList = pizzas.map( pizza => {
      if (pizza.id === editedPizza.id) {
        return editedPizza
      } else {
        return pizza
      }
    })
    setPizzas(newPizzaList)
    setIsEdit(null)
  }

  const handleChange = (e) => {
    
    if (e.target.type === "radio") {
      setNewPizza({...newPizza, vegetarian:e.target.value === "veggy" })
    } else {
      setNewPizza({ ...newPizza, [e.target.name]:e.target.value})
    }

  }

  const editPizza = (pizza) => {
    setNewPizza({
      topping:pizza.topping,
      size:pizza.size,
      vegetarian:pizza.vegetarian
    })
    setIsEdit(pizza)
  }


  return (
    <>
      <Header />
      <PizzaForm updatePizzas={updatePizzas} newPizza={newPizza} handleChange={handleChange} isEdit={isEdit} updateEditedPizzas={updateEditedPizzas}/>
      <PizzaList pizzas={pizzas}  editPizza={editPizza}/>
    </>
  );
}

export default App;
