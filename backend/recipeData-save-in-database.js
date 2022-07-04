const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mydb');

const connection = mongoose.connection;
let recipeSchema= new mongoose.Schema({
    dishName:String,
    ingredients:[{
        ingredientName:String,
        quantity:String
    }],
    recipe: Array
});
let RecipeModel=connection.model('recipe',recipeSchema);

let recipeData = [
    {
        dishName: 'butter chicken',
        ingredients: [
        {
            ingredientName: 'chicken',
            quantity: '500gm'
        },
        {
            ingredientName: 'onions',
            quantity: '250gm'
        },
        {
            ingredientName: 'tomatos',
            quantity: '250gm'
        },
        {
            ingredientName: 'Amul butter',
            quantity: '200gm'
        }
        ],
        recipe: ['wash chicken and boil it for 10 mins','heat up the pan and add butter',
        'add garlic, ginger and chillies to it','chop onion and tomatos and then add them to the pan','butten chicken is ready']
    },
    {
        dishName: 'paneer tikka',
        ingredients: [
        {
            ingredientName: 'paneer',
            quantity: '400gm'
        },
        {
            ingredientName: 'onions',
            quantity: '250gm'
        },
        {
            ingredientName: 'tomatos',
            quantity: '250gm'
        },
        {
            ingredientName: 'Amul butter',
            quantity: '200gm'
        }
        ],
        recipe: ['wash paneer and fry it on low flame for 5 mins','heat up the pan and add butter',
        'add garlic, ginger and chillies to it','chop onion and tomatos and then add them to the pan','butten chicken is ready']
    },
    {
        dishName: 'pav bhaji',
        ingredients: [
        {
            ingredientName: 'potatos',
            quantity: '500gm'
        },
        {
            ingredientName: 'onions',
            quantity: '250gm'
        },
        {
            ingredientName: 'tomatos',
            quantity: '250gm'
        },
        {
            ingredientName: 'Amul butter',
            quantity: '200gm'
        }
        ],
        recipe: ['wash potatos and boil it for 10 mins','heat up the pan and add butter',
        'add garlic, ginger and chillies to it','chop onion and tomatos and then add them to the pan','butten chicken is ready']
    }
    ]
    
   
    RecipeModel.create(recipeData,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
        }
    })
    
    