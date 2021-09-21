
const BASE_URL="http://localhost:3000/coffee"
const container=document.getElementById("coffee-list")
const searchBar=document.getElementById("searchBar");
const recipeSubmit=document.getElementById("recipeSubmit")
const addForm=document.getElementById("addForm");

//console.log(searchBar)

addForm.addEventListener("submit",(event)=>{
  event.preventDefault();
  const [title,image,type,description,ingredients,recipe,likes]=event.target
  fetch(" http://localhost:3000/coffee", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            title:title.value,
            image:image.value,
            type:type.value,
            ingredients:ingredients.value,
            recipe:recipe.value,
            description:description.value,
            likes:likes.value
        })
    })
    .then(response => response.json())
    .then(response => console.log(response))
    addForm.reset()
})
addForm.addEventListener("submit",()=>{
  alert("Your recipe has been submited")
})

function search_coffee() {
  let input = document.getElementById('searchBar').value
  input=input.toLowerCase();
  //let x = document.getElementsByClassName(`coffee-card`);
    debugger;
  for (i = 0; i < copy.length; i++) { 
      if (!copy[i].innerHTML.toLowerCase().includes(input)) {
          copy[i].style.display="none";
      }
      else {
          copy[i].style.display="list-item";                 
      }
  }
}
searchBar.addEventListener('keyup',search_coffee)


//console.log(container)
//json-server --watch db.json
let pageNumber =1
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

function getCoffee(){
fetch(`http://localhost:3000/coffee?_limit=3&_page=${pageNumber}`)
.then(resp=>resp.json())
.then(data=>{
    data.forEach(renderCoffee)
   
})
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
  debugger;
  coffeeList.innerHTML = ""
  
  getCoffee()

}
const handleBackClick=(event)=>{
  
  pageNumber-=1
  const coffeeList=document.querySelector("#coffee-list")
  coffeeList.innerHTML=""
  
  getCoffee()
}


let copy
document.addEventListener("DOMContentLoaded",(event)=>{
  
  fetch('http://localhost:3000/coffee')
  .then(resp=>resp.json())
  .then(data=>{
    copy=data
    
  })


  getCoffee()

})