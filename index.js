let ranArr=[];

document.getElementById("sort-btn").hidden=true;

//random number//
function generateElement(){
  return Math.floor(Math.random()*100)+1;
}

//generating arr//
function generateArray(){
  return [generateElement(),generateElement(), generateElement(),generateElement(),generateElement()]
}

//generating container for arr//
function generateContainer(){
  return document.createElement("div");
}

//creating the spans//
function fillArrContainer(html,arr){
  html.innerHTML="";
  arr.forEach(x=>{
    let span=document.createElement("span");
    span.textContent=x;
    html.appendChild(span);
  })
}

function isOrdered(a,b){
  return a<=b;
}

//setting up the swapping method//
function swapElements(arr,i){
  if(!isOrdered(arr[i],arr[i+1])){
    [arr[i],arr[i+1]]=[arr[i+1],arr[i]];
    return true;
  }
  return false;
}

//highlighting//
function highlightCurrentEls(html,i){
  let child=html.children;
  if(child[i]) child[i].style.border="2px dashed red";
  if(child[i+1]) child[i+1].style.border="2px dashed red";
}

// setting up the generating numbers button//
document.getElementById("generate-btn").addEventListener("click",()=>{
  let arrayContainer=document.getElementById("array-container");
  arrayContainer.innerHTML="";
  let div=generateContainer();
  div.id="starting-array"
  arrayContainer.appendChild(div)
   ranArr=generateArray();
   fillArrContainer(div,ranArr)
   
   document.getElementById("sort-btn").hidden=false;
})

//setting up the shorting button//
document.getElementById("sort-btn").addEventListener("click",()=>{
  let arrayContainer=document.getElementById("array-container");
  let startingArray=document.getElementById("starting-array");
  fillArrContainer(startingArray,ranArr);
  highlightCurrentEls(startingArray,0);
  let arr=[...ranArr];
  let first=true;
  //checking loops//
  for(let i=0;i<arr.length-1;i++){
    let swapped=false;
    for(let j=0;j<arr.length-1;j++){
      if(first){
        first=false;
        swapped=swapElements(arr,j);
        continue;
      }
      //rows of shorting//
      let midDiv=generateContainer()
      fillArrContainer(midDiv,arr);
      highlightCurrentEls(midDiv,j);
      arrayContainer.appendChild(midDiv)
      
      if(swapElements(arr,j)) swapped=true;
    }
    //stopping the rows if no more numbers to swap//
    if(!swapped) break;
  }
//final result row//
let lastDiv=generateContainer();
fillArrContainer(lastDiv,arr);
arrayContainer.appendChild(lastDiv);

document.getElementById("sort-btn").hidden=true;
})