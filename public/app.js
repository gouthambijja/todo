"use strict";
const userinput = document.querySelector("#username");
const available = document.querySelector(".usernameavailable");
const notavailable = document.querySelector(".usernamenotavailable");
userinput.addEventListener("input", async () => {
  if (userinput.value != "") {
    const length = await fetch(
      `https://ultimatetodo.herokuapp.com/isusernameavailable/${userinput.value}`
    );
    const flength = await length.json();
    if (flength == 0) {
      available.style.display = "inline-block";
      notavailable.style.display = "none";
    } else {
      notavailable.style.display = "inline-block";
      available.style.display = "none";
    }
  } else {
    notavailable.style.display = "none";
    available.style.display = "none";
  }
});
