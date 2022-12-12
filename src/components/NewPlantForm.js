import React, { useState } from "react";

const BASE_URL = "http://localhost:6001/plants"
const initialNewPlant = {
  name: "",
  image:"",
  price: 0
}

function NewPlantForm({ setPlants }) {
  const [newPlant, setNewPlant] = useState({initialNewPlant});

  function handleChange(e) {
    setNewPlant((currentNewPlantState) => ({
      ...currentNewPlantState, 
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault(0);
    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlant)
    })
    .then((resp) => resp.json())
    .then(data => setPlants((currentPlants) => [...currentPlants, data]));

    setNewPlant(initialNewPlant);
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={newPlant.name} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" value={newPlant.image} onChange={handleChange} />
        <input type="number" name="price" step="0.01" placeholder="Price" value={newPlant.price} onChange={handleChange} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
