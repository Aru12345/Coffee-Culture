
const BASE_URL="http://localhost:3000/coffee"
const container=document.getElementById("coffee-list")
const searchBar=document.getElementById("searchBar");
let coffeeList=[]
console.log(searchBar)
searchBar.addEventListener("keyup",(e)=>{
  const searchString =e.target.value
 const filteredCharacters= coffeeList.filter(character=>{
   return  character.name.include(searchString)
  });
  console.log(filteredCharacters);
})
//console.log(container)
//json-server --watch db.json

function renderCoffee(coffee){
    const div=document.createElement("div")
    div.id="coffeeCard-${coffee.id}"
    div.className="coffee-card"
    
    const header=document.createElement("h3")
    header.textContent=` ${coffee.title}` 
    const coffeeImg=document.createElement("img");
    coffeeImg.src=coffee.image;
    coffeeImg.alt=`${coffee.name} image`
    
    
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
    
    div.append(header,coffeeImg,p)
    container.appendChild(div)
}
function getCoffee(){
try{const res= fetch('http://localhost:3000/coffee?per_page=3')
.then(resp=>resp.json())
.then(data=>{
    data.forEach(renderCoffee)
    //let coffeeList= res.json()
})
}catch(err){
  console.err(err)
}

}




document.addEventListener("DOMContentLoaded",()=>{
  getCoffee()
})