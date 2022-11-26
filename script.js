let password = document.querySelector("#generated");
let characters = document.querySelector("#characters");
let uppercase = document.querySelector("#uppercase");
let lowercase = document.querySelector("#lowercase");
let numbers = document.querySelector("#numbers");
let symbols = document.querySelector("#symbols");

let copy = document.querySelector("#copy");
let generate = document.querySelectorAll(".generate");
let message = document.querySelector(".message");

copy.addEventListener("click", function () {
  message.innerHTML = "";

  password.select();
  password.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(password.value);

  message.innerHTML = "Senha copiada";
});

generate.forEach((e) => {
  e.addEventListener("click", function () {
    message.innerHTML = "";

    if (characters.value < 4) {
      message.innerHTML = "Mínimo de 4 caracteres";
      return;
    }

    let check = [
      uppercase.checked,
      lowercase.checked,
      numbers.checked,
      symbols.checked,
    ];

    if (check.filter((e) => e == true).length < 2) {
      message.innerHTML = "Selecione ao menos duas opção";
      return;
    }

    generated();
  });
});

function hash() {
  let hash = "";
  if (uppercase.checked) {
    hash += "ABCDEFGHIJLMNOPQRSTUVWXYZ";
  }

  if (lowercase.checked) {
    hash += "abcdefghijklmnopqrstuvwxyz";
  }

  if (numbers.checked) {
    hash += "0123456789";
  }

  if (symbols.checked) {
    hash += "!@#$%^&*()+?><:{}[]";
  }

  return hash;
}

function generated() {
  let pass = "";
  for (let i = 0; i < characters.value; i++) {
    let random = Math.floor(Math.random() * hash().length);
    pass += hash().substring(random, random + 1);
  }
  document.getElementById("generated").value = pass;
}

generated();