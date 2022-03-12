const populateButton = document.querySelector(".populate");
const populateOne = document.querySelector(".popOne");
const inputID = document.querySelector(".userInput");

populateButton.addEventListener("click", () => {
  fetch("/home")
    .then((res) => res.json())
    .then((data) => console.log(data));
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
