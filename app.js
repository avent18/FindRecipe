const  searchBox = document.querySelector('.searchBox');
const  searchBtn = document.querySelector('.searchBtn');
const  recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContet = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


const fetchData = async (query) => {
  recipeContainer.innerHTML="<h2>Fetching Recipies....</h2>"
  const data = await  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
  const response = await data.json();


  recipeContainer.innerHTML="";
  response.meals.forEach(meal => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span> Category <p>
    `

    const button = document.createElement('button');
    button.textContent = "View Details";
    recipeDiv.appendChild(button);

    button.addEventListener('click', ()=>{
      openRecipePopup(meal)
    })

    recipeContainer.appendChild(recipeDiv);
  });
  console.log(response.meals);
  
}

const openRecipePopup = (meal)=>{
  recipeDetailsContet.innerHTML = `
  <h2 class="recipeName">${meal.strMeal}</h2>
  <h3>Ingredents:</h3>
  <ul class="ingredientList">${fetchIngredients(meal)}</ul>
   <div>
   <h3>Instructions</h3>
   <p class="recipeInstructions">${meal.strInstructions}</p>
   </div>
  `

   

  recipeDetailsContet.parentElement.style.display = "block";
}


const fetchIngredients = (meal)=>{
  
   let ingredientsList = "";
   for(let i=1; i<=20; i++){
    const ingredent = meal[`strIngredient${i}`];
    if(ingredent){
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredent}</li>`
    }
    else {
      break;
    }
   }
   return ingredientsList;
}


recipeCloseBtn.addEventListener('click', (e)=>{
  recipeDetailsContet.parentElement.style.display = "none";
})
searchBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  fetchData(searchInput);
})