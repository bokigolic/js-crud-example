console.log("Hello");

// CONSTS
const form = document.getElementById("form");
const name = document.getElementById("name");
const quantity = document.getElementById("quantity");
const inventoryContainer = document.getElementById("inventory-container");

// STATE
let inventory = [];


// FUNCTIONS

// MODEL (work with data) functions

const handleSubmit = (e) => {
  // najpre preventDefault da se ne desi default desavanje sa submitom forme (koje izaziva ponovni poziv adrese stranice i refresh)
  e.preventDefault();
  console.log("Submit");
  // uzimamo vrendosti iz input polja i stavljamo u promenjive
  const formData = {};
  formData.name = name.value;
  formData.quantity = quantity.value;
  console.log(formData);
  // dodajemo formData u state
  //inventory = [...inventory, formData];
  inventory.push(formData);
  console.log('state changed! inventory', inventory);
  // after state update we need to rerender screen
  // we just inform app that state is changed
  stateIsChnaged();
};

// VIEW (work with screen, display, render etc) funcions

const renderState = () =>{
  // drowe all state on screen
  // preparing template
  // let template = "some template";
  let template = "";
  inventory.forEach((item, index)=>{
    template += '<div>' + item.quantity + " x " + item.name + '</div>';
  });

  // render template on scren
  inventoryContainer.innerHTML = template;
};

// OTHER functions
const stateIsChnaged = () => {
  // after state update we need to rerender screen
  renderState();
};


// INIT
const init = () => {
  console.log("initialization...");

  // add event listeners
  form.addEventListener("submit", handleSubmit)

  console.log("initialized");
};




// START SCRIPT
init();