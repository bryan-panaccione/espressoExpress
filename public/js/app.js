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
//adminDBCALL selectors

//DB calls
populateButton.addEventListener("click", () => PetsDB.populateAll());
const pageRight = document.querySelector("#rightPage");
const pageLeft = document.querySelector("#leftPage");

applyFilter.addEventListener("click", () => {
  let filterStack = {
    type: typeFilter.value,
    kid: kidFilter.value,
    ani: aniFilter.value,
    vax: vaxFilter.value,
  };
  PetsDB.filterPets(filterStack);
  PetsDB.getCount(filterStack);
});

pageRight.addEventListener("click", () => {
  let filterStack = {
    type: typeFilter.value,
    kid: kidFilter.value,
    ani: aniFilter.value,
    vax: vaxFilter.value,
  };
  PetsDB.paginateRight(filterStack);
});
//Admin Pagination
const adminArea = document.querySelector(".adminContent");

const addPager = document.querySelector("#addAdminPage");
const updatePager = document.querySelector("#updateAdminPage");
const deletePager = document.querySelector("#deleteAdminPage");

//Admin Add pet page populate
addPager.addEventListener("click", () => {
  adminArea.innerHTML = Admin.add();
  const addPet = document.querySelector("#addtoDB");
  // admin add animal, variables have to be here because async
  //try to fix with async await later
  addPet.addEventListener("click", () => {
    const type = document.querySelector(".petAddKind");
    const name = document.querySelector("#petAddName");
    const age = document.querySelector("#petAddAge");
    const breed = document.querySelector("#petAddBreed");
    const aniBool = document.querySelector("#petAddAni");
    const kidBool = document.querySelector("#petAddKid");
    const vaxBool = document.querySelector("#petAddVax");
    const bio = document.querySelector(".longInput");
    let addObj = {
      name: name.value || "---",
      age: age.value || 9999,
      breed: breed.value || "---",
      kind: type.value || "---",
      vax_status: vaxBool.checked,
      good_w_kids: kidBool.checked,
      good_w_animals: aniBool.checked,
      about_pet: bio.value || "---",
    };
    PetsDB.addPetToDB(addObj);
    name.value = "";
    age.value = "";
    breed.value = "";
    type.value = "";
    aniBool.checked = false;
    kidBool.checked = false;
    vaxBool.checked = false;
    bio.value = "";
  });
});

//Populate admin update area
updatePager.addEventListener("click", () => {
  adminArea.innerHTML = Admin.update();
  const getPet = document.querySelector("#getPet");
  const pushUpdate = document.querySelector("#updateDB");
  const petIDinput = document.querySelector(".updateIDpatch");
  getPet.addEventListener("click", () => {
    if (Number.isInteger(parseInt(petIDinput.value))) {
      PetsDB.getOnePet(petIDinput.value);
    } else {
      console.log("enter valid id");
    }
  });

  pushUpdate.addEventListener("click", () => {
    PetsDB.updatePet();
  });
});

deletePager.addEventListener("click", () => {
  adminArea.innerHTML = Admin.deleter();
  const getPet = document.querySelector("#getPet");
  let idDeleteINPUT = document.querySelector(".updateIDpatch");
  getPet.addEventListener("click", () => {
    PetsDB.getDeletePet(idDeleteINPUT);
  });
});

//mobile pagination dogs
const rightArrow = document.querySelector(".right");
const leftArrow = document.querySelector(".left");

leftArrow.addEventListener("click", () => petArea.prepend(petArea.lastChild));

rightArrow.addEventListener("click", () => petArea.append(petArea.firstChild));

//Search Event Listener Active Search
document.addEventListener("keyup", (e) => {
  if (searchBar === document.activeElement) {
    filterParent(e);
  }
});
