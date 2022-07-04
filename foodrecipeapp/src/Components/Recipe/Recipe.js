import {useState} from 'react';
import React,{Component} from 'react';
import './Recipe.css';
export default function Recipe(props){
    const [data,setData] = useState({flag:false,data:null});
    return(
        <div>
            <div className='nav'>
            <h1>Recipe Finder Application</h1>
            
            <input type = 'text' placeholder='Enter name of a dish' id='dish'/>
            <button className='btn btn-dark'onClick={findRecipe}>Search</button>
            </div>
            <div id='info'>
                {data.flag && <div className="card" style={{width: "24rem",height: "36rem"}}>
                {/* <img src="pav bhaji.jpg" class="card-img-top" alt=" no load"></img> */}
                <div className="card-body">
                    <h1 className="card-title">{data.data.dishName}</h1>
                    <h3 className="card-header mb-2 text-muted">Ingredients</h3>
                    <ul className="list-group list-group-flush">
                        {data.data.ingredients.map((item)=>{
                            
                            return  <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center " key={item.ingredientName}>{item.ingredientName} <span className="badge bg-primary rounded-pill"> {item.quantity}</span></li>
                        })}
                        </ul>
                        <h3 className="card-header mb-2 text-muted">Recipe</h3>
                        <ul className="list-group list-group-flush">
                        {data.data.recipe.map((item)=>{
                            
                            return <li className="list-group-item list-group-item-action" key={item}>{item}</li>
                        })}
                        </ul></div>
                    
                    </div>}
                
            </div>
        </div>
    

    );
    async function findRecipe(){
        console.log('function called');
        let url = 'http://localhost:3001/getrecipe';
        let name = document.getElementById('dish').value;
        let options = {
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({dishName:name})
        }
        let res = await fetch(url,options);
        console.log(res);
        let data = await res.json();
        if(data.flag===true){
            console.log(data);
            setData(data);
        }
        else{
            alert('Recipe not found');
        }
       
    }
}
