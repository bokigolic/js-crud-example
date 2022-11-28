console.log("Hello");

// CONSTS
const form = document.getElementById("form");
const name = document.getElementById("name");
const quantity = document.getElementById("quantity");
const inventoryContainer = document.getElementById("inventory-container");

// STATE
let inventory = [];
let counter = 0;

// FUNCTIONS

// MODEL (work with data) functions

const createItem = (formData) => {
  const newItem = {
    ...formData,
    id: getFreshId()
  };
  inventory.push(newItem);
  // inform app that state is changed
  stateIsChnaged();
};

const deleteItem = (id) => {
  const updatedInventory = inventory.filter((item) => {
    id = parseInt(id); // converting id from string to number
    if (id === item.id) {
      return false;      // ne ulazi u sastav novog niza, jer njega brisemo 
    }
    return true // svi ostali ostaju u nizu
  });
  // update state
  inventory = updatedInventory;
  // inform app that state is changed
  stateIsChnaged();
};

// VIEW (work with screen, display, render etc) funcions

const renderState = () => {
  // drowe all state on screen
  // preparing template
  // let template = "some template";
  let template = "";
  inventory.forEach((item, index) => {
    template += '<div data-id="' + item.id + '">' + item.quantity + " x " + item.name + ' (id:' + item.id + ')<button class="btn-delete" data-id="' + item.id + '">Delete</button></div>';
  });

  // render template on scren
  inventoryContainer.innerHTML = template;

  // adding event listerers to rendered elements
  const buttons = document.getElementsByClassName("btn-delete");
  console.log('html selected buttons', buttons);
  /*
  buttons.addEventListener("click",(e)=>{
    console.log("clcked on delete", e.target);
  })
  */
  for (var i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    btn.addEventListener("click", (e) => {
      console.log("clcked on delete", e.target);
      console.log('data-id:', e.target.dataset['id']); // uzimamo ono sto je upisano u njegov dat-id etribut
      const id = e.target.dataset['id'];
      // sada obristi taj elemnt na ciji id smo kliknuli
      deleteItem(id);
    });
  }
};

// OTHER functions
const stateIsChnaged = () => {
  console.log('state is changed:', inventory);
  // after state update we need to rerender screen
  renderState();
};

const getFreshId = () => {
  counter++;
  return counter;
};

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
  createItem(formData);
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