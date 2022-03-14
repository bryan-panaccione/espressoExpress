import * as Admin from "./helperBlocks.js";

const populateButton = document.querySelector(".populate");
const populateOne = document.querySelector(".popOne");
const inputID = document.querySelector(".userInput");
const petArea = document.querySelector(".row.petAppendArea");

populateButton.addEventListener("click", () => {
  fetch("/home")
    .then((res) => res.json())
    .then((data) => {
      for (let pet of data) {
        console.log(pet);
        let card = document.createElement("div");
        card.classList.add("4u");
        card.innerHTML = Admin.petCard(
          pet["name"],
          pet["age"],
          pet["breed"],
          pet["kind"],
          pet["vax_status"],
          pet["good_w_kids"],
          pet["good_w_animals"],
          pet["about_pet"],
          pet["id"]
        );

        petArea.appendChild(card);
      }
    });
});

populateOne.addEventListener("click", (e) => {
  e.preventDefault();
  const inputINT = Number.parseInt(inputID.value);
  if (!Number.isNaN(inputINT)) {
    inputID.value = "";
    fetch(`/home/${inputINT}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  } else {
    console.log("enter valid number");
    inputID.value = "";
  }
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
