import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, handleDonate, handleLikeClick }) {

  let toysArray;
  if (toys) {
    toysArray = toys.map((toy)=>{
      return <ToyCard 
      toy={toy}
      key={toy.id}
      id={toy.id}
      name={toy.name}
      image={toy.image}
      likes={toy.likes}
      handleDonate={handleDonate}
      handleLikeClick={handleLikeClick}
      />
    })
  }

  return (
    <div id="toy-collection">{toysArray}</div>
  );
}

export default ToyContainer;
