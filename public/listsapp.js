function getrandom() {
  const x = Math.floor(Math.random() * 256);
  if (x < 100) return 150;
  return x;
}
for (let i = 0; i < document.querySelectorAll("li").length; i++) {
  const color = `rgb(
        ${getrandom()},${getrandom()},${getrandom()}
  )`;
  document.querySelectorAll("li")[i].style.background = color;
}
const ol = document.querySelector("ol");
const add = document.querySelector(".addbtn");
const randamadd = document.querySelector(".random-add-btn");
const input = document.querySelector("#newtodo");
async function insert() {
  if (input.value !== "") {
    const res = await fetch(
      `http://localhost:3000/kakarot/newtodo?string=${input.value}`,
      { mode: "no-cors" }
    );
    const nb = document.createElement("li");
    nb.classList.add("data");
    nb.innerText = `${input.value}`;
    ol.append(nb);
    input.value = "";
  }
}
add.addEventListener("click", async () => {
  insert();
});

randamadd.addEventListener("click", async () => {
  const bored = await fetch("https://icanhazdadjoke.com", {
    headers: { Accept: "application/json" },
  });
  const fbored = await bored.json();
  const res = await fetch(
    `http://localhost:3000/kakarot/newtodo?string=${fbored.joke}`,
    { mode: "no-cors" }
  );
  const nb = document.createElement("li");
  nb.classList.add("data");
  nb.innerText = `${fbored.joke}`;
  ol.append(nb);
});
ol.addEventListener("click", async (e) => {
  const res = await fetch(
    `http://localhost:3000/kakarot/${e.target.innerText}`,
    { mode: "no-cors" }
  );
  e.target.parentNode.removeChild(e.target);
});
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") insert();
});
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    input.focus();
  }
});
