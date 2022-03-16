import { petCard } from "./helperBlocks.js";
const petArea = document.querySelector(".row.petAppendArea");
export function populateAll() {
  fetch("/home")
    .then((res) => res.json())
    .then((data) => {
      let count = 0;
      petArea.innerHTML = "";
      for (let pet of data) {
        let card = document.createElement("div");
        card.classList.add("4u");
        card.classList.add("stacker");
        card.innerHTML = petCard(
          pet["name"],
          pet["age"],
          pet["breed"],
          pet["kind"],
          pet["vax_status"],
          pet["good_w_kids"],
          pet["good_w_animals"],
          pet["about_pet"],
          pet["id"],
          count
        );

        petArea.appendChild(card);
        count++;
      }
    });
}

export function filterPets(obj) {
  ///build string in order here
  let url2 = "/search/";
  let url = `/search/${obj["type"]}/${obj["kid"]}/${obj["ani"]}/${obj["vax"]}`;
  console.log(url);
  fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "bry");
    });
}
