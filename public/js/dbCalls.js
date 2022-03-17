import { petCard, update } from "./helperBlocks.js";
const petArea = document.querySelector(".row.petAppendArea");
let pageCount = 1;
function cardGenerator(data) {
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
}

function singleCard(obj) {
  let count = petArea.length || 0;
  let card = document.createElement("div");
  card.classList.add("4u");
  card.classList.add("stacker");
  card.innerHTML = petCard(
    obj["name"],
    obj["age"],
    obj["breed"],
    obj["kind"],
    obj["vax_status"],
    obj["good_w_kids"],
    obj["good_w_animals"],
    obj["about_pet"],
    obj["id"],
    count
  );

  petArea.appendChild(card);
  count++;
}

function showOfPages(pageNum, resultNum) {
  let pageCounter = document.querySelector("#nineOfDisp");
  let currentPage = document.querySelector("#currentPage");
  pageCounter.innerText = `${resultNum % 9}`;
  currentPage.innerText = `${pageNum} `;
}

function updatePage(pageNum) {
  let totalPages = document.querySelector("#nineOfDisp");
  let currentPage = document.querySelector("#currentPage");
  if (pageNum < parseInt(totalPages.innerText)) {
    currentPage.innerText = `${pageNum} `;
  } else {
    pageCount = 1;
    currentPage.innerText = `${1}`;
  }
}
export function getFullCount(obj) {
  let url = `/home/count/all`;
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
      let countDisplay = document.querySelector("#resultCount");
      countDisplay.innerText = `Results: ${data[0].count}`;
      showOfPages(1, data[0].count);
      let displayPageTag = document.querySelector(".filterSelections");
      displayPageTag.classList.remove("hideMe");
    });
}

export function populateAll() {
  fetch("/home")
    .then((res) => res.json())
    .then((data) => {
      cardGenerator(data);
      getFullCount();
    });
}

export function filterPets(obj) {
  let url = `/search/${obj["type"]}/${obj["kid"]}/${obj["ani"]}/${obj["vax"]}`;

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
      if (typeof data === "object") {
        cardGenerator(data);
      } else {
        console.log("no bad");
      }
    });
}

export function getCount(obj) {
  let url = `/search/count/${obj["type"]}/${obj["kid"]}/${obj["ani"]}/${obj["vax"]}`;

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
      let countDisplay = document.querySelector("#resultCount");
      countDisplay.innerText = `Results: ${data.count}`;
    });
}

export function paginateRight(obj) {
  let url = `/search/paginate/${obj["type"]}/${obj["kid"]}/${obj["ani"]}/${obj["vax"]}`;

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
      if (typeof data === "object") {
        pageCount++;
        cardGenerator(data);
        updatePage(pageCount);
      } else {
        console.log("no bad");
      }
    });
}
//admin functions below

export function addPetToDB(addObj) {
  fetch("/home/admin", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(addObj),
  })
    .then((res) => res.json())
    .then((data) => {
      singleCard(data);
    });
}

export function getDeletePet(id) {
  fetch(`/home/${id.value}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.name === undefined) {
        console.log("doesnt exist");
      } else {
        const confirm = document.querySelector(".areYouSure");
        confirm.innerHTML = `
      ${data.name}, ID: <p id='tbDELETED'>${data.id} </p>
      <button class="confirm button special" style="background-color: red; margin-left: 2em;">
      Confirm</button>`;

        const confirmButt = document.querySelector(".confirm");
        confirmButt.addEventListener("click", () => {
          deleteOnePet(data.id);
          confirm.innerHTML = "";
        });
      }
    });
}

export function deleteOnePet(id) {
  fetch(`/home/admin/${id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

export function getOnePet(id) {
  fetch(`/home/${id}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const chosenIDDisp = document.querySelector("#patchingIDDisp");
      const type = document.querySelector(".petAddKind");
      const name = document.querySelector("#petAddName");
      const age = document.querySelector("#petAddAge");
      const breed = document.querySelector("#petAddBreed");
      const aniBool = document.querySelector("#petAddAni");
      const kidBool = document.querySelector("#petAddKid");
      const vaxBool = document.querySelector("#petAddVax");
      const bio = document.querySelector(".longInput");
      aniBool.checked = false;
      kidBool.checked = false;
      vaxBool.checked = false;
      if (Number.isInteger(data)) {
        console.log("ID doesnt exist");

        chosenIDDisp.innerText = "-";
        name.value = "";
        age.value = "";
        breed.value = "";
        type.value = "";
        aniBool.checked = false;
        kidBool.checked = false;
        vaxBool.checked = false;
        bio.value = "";
      } else {
        name.value = data.name;
        type.value = data.kind;
        age.value = data.age;
        breed.value = data.breed;
        bio.value = data.about_pet;
        if (data.vax_status === true) vaxBool.checked = true;
        if (data.good_w_animals === true) aniBool.checked = true;
        if (data.good_w_kids === true) kidBool.checked = true;
        chosenIDDisp.innerText = data.id;
      }
    });
}

export function updatePet() {
  const idDiv = document.querySelector("#patchingIDDisp");
  const type = document.querySelector(".petAddKind");
  const name = document.querySelector("#petAddName");
  const age = document.querySelector("#petAddAge");
  const breed = document.querySelector("#petAddBreed");
  const aniBool = document.querySelector("#petAddAni");
  const kidBool = document.querySelector("#petAddKid");
  const vaxBool = document.querySelector("#petAddVax");
  const bio = document.querySelector(".longInput");
  let addObj = {
    name: name.value || undefined,
    age: age.value || undefined,
    breed: breed.value || undefined,
    kind: type.value || undefined,
    vax_status: vaxBool.checked,
    good_w_kids: kidBool.checked,
    good_w_animals: aniBool.checked,
    about_pet: bio.value || undefined,
  };

  fetch(`/home/admin/${idDiv.innerText}`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(addObj),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(`${data[0].name} updated!`);
      const chosenIDDisp = document.querySelector("#patchingIDDisp");
      chosenIDDisp.innerText = "-";
      name.value = "";
      age.value = "";
      breed.value = "";
      type.value = "";
      aniBool.checked = false;
      kidBool.checked = false;
      vaxBool.checked = false;
      bio.value = "";
    });
}
