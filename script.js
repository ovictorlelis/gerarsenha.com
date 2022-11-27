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
      message.innerHTML = "Mínimo de quatro caracteres";
      return;
    }

    let check = [
      uppercase.checked,
      lowercase.checked,
      numbers.checked,
      symbols.checked,
    ];

    if (check.filter((e) => e == true).length == 0) {
      message.innerHTML = "Selecione no mínimo uma opção";
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

function pwa() {
  // This is the service worker with the Cache-first network
  // Add this below content to your HTML page, or add the js file to your page at the very top to register service worker
  // Check compatibility for the browser we're running this in
  if ("serviceWorker" in navigator) {
    if (navigator.serviceWorker.controller) {
      console.log(
        "[PWA Builder] active service worker found, no need to register"
      );
    } else {
      // Register the service worker
      navigator.serviceWorker
        .register("sw.js", {
          scope: "./",
        })
        .then(function (reg) {
          console.log(
            "[PWA Builder] Service worker has been registered for scope: " +
              reg.scope
          );
        });
    }
  }
}

pwa();
generated();
