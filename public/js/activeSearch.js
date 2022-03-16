export const searchBar = document.querySelector("#activeSearch");
export const resultCount = document.querySelector("#resultCount");

export function filters() {
  let allPets = document.querySelectorAll(".petBox");
  for (var i = 0; i < allPets.length; i++) {
    if (
      !allPets[i].childNodes[1].innerText
        .toUpperCase()
        .includes(searchBar.value.toUpperCase())
    ) {
      allPets[i].parentNode.classList.add("hideMe");
    }
  }
}

//refresh list by unhiding all
export function replacer() {
  let allHiddenPets = document.querySelectorAll(".hideMe");
  for (var i = 0; i < allHiddenPets.length; i++) {
    if (
      allHiddenPets[i].childNodes[1].innerText
        .toUpperCase()
        .includes(searchBar.value.toUpperCase())
    )
      allHiddenPets[i].classList.remove("hideMe");
  }
}

//parent filter function, called on key up
export function filterParent(e) {
  if (e.key === "Backspace") {
    replacer();
  } else filters();
}
