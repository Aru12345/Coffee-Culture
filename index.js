
const BASE_URL="http://localhost:3000/coffee";
const container=document.getElementById("coffee-list");
const searchBar=document.getElementById("searchBar");
const recipeSubmit=document.getElementById("recipeSubmit");
const addForm=document.getElementById("addForm");
const forward=document.getElementById("forward");
const back =document.getElementById("#back");
let pageNumber =1
//json-server --watch db.json
addForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  window.scrollTo(0, 0);
})

searchBar.addEventListener("keyup",search_coffee)

function getCoffee(){
  fetch(`http://localhost:3000/coffee?_limit=15&_page=${pageNumber}`)
  .then(resp=>resp.json())
  .then(data=>{
      data.forEach(renderCoffee)
      })
  }

function renderCoffee(coffee){
    const div=document.createElement("div")
    div.id="coffeeCard-${coffee.id}"
    div.className="coffee-card"
    
    const header=document.createElement("h3")
    header.textContent=` ${coffee.title}` 

    const coffeeImg=document.createElement("img");
    coffeeImg.src=coffee.image;
    coffeeImg.alt=`${coffee.name} image`
    
    const coffeeLikes = document.createElement("h5");
   coffeeLikes.textContent = "Likes";
  
   const likesNum = document.createElement("h4");
  likesNum.className = "like-num";
  likesNum.textContent = coffee.likes;
    
  const likeBttn = document.createElement("button");
  likeBttn.className = "like-bttn";
  likeBttn.textContent = "Like";
  likeBttn.addEventListener("click", () => increaseLikes(coffee, likesNum));

    const p=document.createElement("p")
    p.id=`coffee-info-${coffee.id}`
    p.className='coffeeClass'
    p.innerHTML=`
    <b>Description:</b>
     ${coffee.description}
     <br>
    <b>Type</b>:${coffee.type}
    <br>
    <b>Ingredients</b>:${coffee.ingredients}
    <br>
    <b>Recipe</b>:${coffee.recipe}
    `
    
    div.append(header,coffeeImg,p,coffeeLikes,likesNum,likeBttn)
    container.appendChild(div)
}

function createCoffee(event) {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const image = event.target.querySelector("#image").value;
  const description=document.querySelector("#description").value;
  const type=document.querySelector("#type").value;
  const ingredients=document.querySelector('#ingredients').value
  const recipe=document.querySelector("#recipe").value

  const coffee= {
    title:title,
    image:image,
    description:description,
    type:type,
    ingredients:ingredients,
    recipe:recipe,
    likes: 0,
  };

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(coffee),
  };

  fetch(BASE_URL, configObj)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (coffee) {
      renderCoffee(coffee);
    });
  addForm.reset();
}
addForm.addEventListener("submit",()=>{
  alert("Your recipe is published.") 
})




function increaseLikes(coffee, likesNum) {
  ++coffee.likes;
  likesNum.textContent = coffee.likes;

  fetch(`http://localhost:3000/coffee/${coffee.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ likes: coffee.likes }), 
  });
  
}

document.addEventListener("click",(event)=>{
  if(event.target.matches("button#back")){
    event.preventDefault()
    handleBackClick()
  }
  if(event.target.matches("button#forward")){
    event.preventDefault()
    handleFrontClick()
  }
})

const handleFrontClick = (event) => {

  pageNumber += 1
  const coffeeList = document.querySelector('#coffee-list')
  coffeeList.innerHTML = ""
 
  getCoffee()
  window.scrollTo(0, 0);

}
const handleBackClick=(event)=>{

  pageNumber-=1
  const coffeeList=document.querySelector("#coffee-list")
  coffeeList.innerHTML=""
  window.scrollTo(0, 0);
  getCoffee()
}

function search_coffee() {
  let input = document.getElementById('searchBar').value
  input=input.toLowerCase();
  let x = document.getElementsByClassName('coffee-card');
     
  for (i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().includes(input)) {
          x[i].style.display="none";
      }
      else {
          x[i].style.display="list-item";                 
      }
  }
}
document.addEventListener("DOMContentLoaded",(event)=>{

   getCoffee()
  addForm.addEventListener("submit", createCoffee);
  
})




