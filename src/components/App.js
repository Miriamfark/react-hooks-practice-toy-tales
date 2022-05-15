import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("")
  const [formImage, setFormImage] = useState("")
  const [toys, setToys] = useState([])

  useEffect(()=>{
    fetch("http://localhost:3001/toys")
    .then(r=>r.json())
    .then((data)=> setToys(data))
  },[])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    const newToyData = {
      id: "",
      name: formName,
      image: formImage,
      likes: 0
    }
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToyData),
    })
    .then((r)=>r.json())
    .then((newToy)=> renderNewToyToPage(newToy))
  }

  function handleNameChange(e) {
    setFormName(e.target.value)
    console.log(formName)
  }

  function handleImageChange(e) {
    setFormImage(e.target.value)
    console.log(formImage)
  }

  function renderNewToyToPage(newToy) {
    const newToysArray = [...toys, newToy]
    setToys(newToysArray)
  }

  function handleDonate(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    })
    .then((r)=>r.json())
    .then(()=>console.log("deleted!"))

    const updatedToysArray = toys.filter((toy)=>{
      return toy.id !== id
    })
    setToys(updatedToysArray)
  }

  function handleLikeClick(toy) {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: toy.likes + 1 })
    })
    .then((r)=>r.json())
    .then(() => 
      setToys(
        toys.map((oldToy) =>
          oldToy.id !== toy.id 
            ? oldToy 
            : { ...oldToy, likes: oldToy.likes + 1 }
      
        )))
    
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm 
      handleFormSubmit={handleFormSubmit}
      handleNameChange={handleNameChange}
      handleImageChange={handleImageChange}
      formName={formName}
      formImage={formImage}
       /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer 
      toys={toys} 
      handleDonate={handleDonate} 
      handleLikeClick={handleLikeClick}
      />
    </>
  );
}

export default App;
