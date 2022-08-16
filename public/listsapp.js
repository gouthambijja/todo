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
      `http://localhost:3000/kakarot/newtodo/${input.value}`
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
  const bored = await fetch("http://www.boredapi.com/api/activity");
  const fbored = await bored.json();
  console.log(fbored.activity);
  const res = await fetch(
    `http://localhost:3000/kakarot/newtodo/${fbored.activity}`
  );
  const nb = document.createElement("li");
  nb.classList.add("data");
  nb.innerText = `${fbored.activity}`;
  ol.append(nb);
});
ol.addEventListener("click", async (e) => {
  const res = await fetch(
    `http://localhost:3000/kakarot/${e.target.innerText}`
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
