const searchBar = document.querySelector("#activeSearch");

function filters() {
  let allPets = document.querySelectorAll(".petBox");
  for (var i = 0; i < allPets.length; i++) {
    if (
      !allPets.childNodes[1].toUpperCase().includes(searchBar.toUpperCase())
    ) {
      allStudents[i].classList.add("hideMe");
    }
  }
}

//refresh list by unhiding all
function replacer() {
  let allHiddenPets = document.querySelectorAll(".hideMe");
  for (var i = 0; i < allHiddenPets.length; i++) {
    allHiddenPets[i].classList.remove("hideMe");
  }
}

//parent filter function, called on key up
function filterParent(e) {
  if (e.key === "Backspace") {
    replacer();
  } else filters();
}

//clear button input and refresh list

document.addEventListener("keyup", (e) => {
  if (searchBar === document.activeElement) {
    filterParent(e);
  }
});
