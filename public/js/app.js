import * as Admin from "./helperBlocks.js";
import { filterParent, searchBar } from "./activeSearch.js";
import * as PetsDB from "./dbCalls.js";

const populateButton = document.querySelector(".populate");
const inputID = document.querySelector(".userInput");
const petArea = document.querySelector(".row.petAppendArea");

//DBCall selectors
const applyFilter = document.querySelector(".popOne");
const typeFilter = document.querySelector("#petDrop");
const kidFilter = document.querySelector("#kidDrop");
const aniFilter = document.querySelector("#aniDrop");
const vaxFilter = document.querySelector("#vaxDrop");

//DB calls
populateButton.addEventListener("click", () => PetsDB.populateAll());

applyFilter.addEventListener("click", () => {
  let filterStack = {
    type: typeFilter.value,
    kid: kidFilter.value,
    ani: aniFilter.value,
    vax: vaxFilter.value,
  };
  PetsDB.filterPets(filterStack);
});

//Admin Pagination
const adminArea = document.querySelector(".adminContent");

const addPager = document.querySelector("#addAdminPage");
const updatePager = document.querySelector("#updateAdminPage");
const deletePager = document.querySelector("#deleteAdminPage");

addPager.addEventListener("click", () => {
  adminArea.innerHTML = Admin.add();
});

updatePager.addEventListener("click", () => {
  adminArea.innerHTML = Admin.update();
});

deletePager.addEventListener("click", () => {
  adminArea.innerHTML = Admin.deleter();
});

//mobile pagination dogs
const rightArrow = document.querySelector(".right");
const leftArrow = document.querySelector(".left");

leftArrow.addEventListener("click", () => petArea.prepend(petArea.lastChild));

rightArrow.addEventListener("click", () => petArea.append(petArea.firstChild));
//remove front and append to back for going right
//remove back and append to front for going left

//Search Event Listener Active Search
document.addEventListener("keyup", (e) => {
  if (searchBar === document.activeElement) {
    filterParent(e);
  }
});
