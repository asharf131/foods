const
  headerEl = document.querySelector("header.main-header"),
  goUpBtn = document.querySelector("#goUp");

// on scroll bar down add / remove effect to main header
// on scroll bar down show / hide button scroll up
onscroll = _ => {
  if (scrollY > 100) {
    headerEl.classList.add("fixed-top", "bg-white", "border-bottom", "shadow-sm")
    goUpBtn.classList.remove("d-none")

  } else {
    goUpBtn.classList.add("d-none")
    headerEl.classList.remove("fixed-top", "bg-white", "border-bottom", "shadow-sm")
  }
}



// on click button go Up  scrollto up page



const addBtns = document.querySelectorAll(".menu #addCart");
let foodsList = JSON.parse(localStorage.getItem("foods")) || [];
// event click add food
addBtns.onclick = _ => {
}
for (const btn of addBtns) {
  btn.onclick = event => {
    event.preventDefault()
    colletDataFood(btn)

  }

}

// Function Collect food data 
function colletDataFood(item) {
  let foodCard = item.parentElement.parentElement.parentElement
  let foodImg = foodCard.querySelector("img").src;
  let foodName = foodCard.querySelector("h4").innerText;
  let foodPrice = foodCard.querySelector("#priceNumber").innerText;
  let foodCount = item.previousElementSibling.value;


  let foodIndex = foodsList.findIndex( item =>{
    return item.name == foodName
  })

  if (foodIndex >= 0) {
    let oldCount = +foodsList[foodIndex].count
    oldCount += +foodCount

    foodsList[foodIndex].count = oldCount
  } else {
    // add new 
    let foodObject = {
      imgSrc: foodImg,
      name: foodName,
      count: foodCount,
      price: foodPrice
    }
  
    foodsList.push(foodObject)
  }

  localStorage.setItem("foods", JSON.stringify(foodsList));

  show()
}




// Function show all food store in loacl storage in list Food Cart
const cartList = document.querySelector(".offcanvas-body"),
  allTotalEl = document.querySelector("#allTotal") ,
  foodNumEl = document.querySelector(".main-header .number");

function show() {
  let sum = 0
  cartList.innerHTML = ""

  foodsList.forEach( (food , ind)=> {
    sum += food.price  * food.count  
    let contentFood =
      `
    <div class="row mb-3">
    <div class="col-3">
      <img src="${food.imgSrc}" alt="" class="img-fluid">
    </div>
    <div class="col">
      <h5>${food.name}</h5>
      <div class="d-flex gap-5">
        <div class="price">Price: <span class="text-primary fw-semibold">${food.price}</span> $</div>
        <div class="count">Count: <span class="text-primary fw-semibold">${food.count}</span></div>
      </div>
      <div class="total">Total: <span class="text-primary fw-semibold">${food.price * food.count}</span> $</div>
    </div>
    <div class="col-2">
      <button class="btn btn-outline-danger" data-id = ${ind} 
      onclick = "delFood(${ind})">
        <i class="bi bi-trash3-fill"></i>
      </button>
    </div>
  </div>
    `
    cartList.innerHTML += contentFood ;

  });
  allTotalEl.innerText = sum ;
  foodNumEl.innerText = foodsList.length;
}
show()

const delAllBtn = document.querySelector("#deleteAllFood") ;
delAllBtn.onclick = deleteAllFoods
// Function delete all food list in cart
function deleteAllFoods() {
  localStorage.removeItem("foods");
  foodsList = []
  show();
}

// Function delete on food list in cart
function delFood(index) {
  foodsList.splice(index , 1)
  localStorage.setItem("foods", JSON.stringify(foodsList));
  show()

}


// Function to store food in local storge 

