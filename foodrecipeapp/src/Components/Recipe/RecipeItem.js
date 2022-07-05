import React, { useState } from "react";
import butterchicken from "./butter-chicken.png";
import { useRef } from "react";
const RecipeItem = (props) => {
  const ref = useRef();

  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleClick = props.handleClick ;
  let { dishName, ingredients, recipe } = props.recipe;

 



  dishName = capitalizeFirstLetter(dishName);



  return (
    <div>
      {/* <h4>Hello I am here</h4> */}

    

      <div className="card my-3 bg-light mx-3">
        <img
          className="card-img-top"
          src={butterchicken}
          alt="Card image cap"
        />
        <div className="card-body">
          <h3 className="card-title">{dishName}</h3>
          <button onClick={() => {handleClick(props.recipe)}} className="btn btn-primary">
            {" "}
            Read Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
