const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle?.addEventListener("click", () => {
  menu.classList.toggle("open");
});

document.querySelectorAll(".menu a").forEach(a => {
  a.addEventListener("click", () => {
    menu.classList.remove("open");
  });
});


document.querySelectorAll(".filter").forEach(btn => {

  btn.addEventListener("click", () => {

    document.querySelectorAll(".filter").forEach(b => {
      b.classList.remove("active");
    });

    btn.classList.add("active");

    const filter = btn.dataset.filter;

    document.querySelectorAll(".animal-card").forEach(card => {

      card.style.display =
        (filter === "todos" || card.dataset.category === filter)
          ? "block"
          : "none";

    });

  });

});


function countdownText(date) {

  const diff = new Date(date) - new Date();

  if (diff <= 0) {
    return "encerrado";
  }

  const days = Math.floor(diff / 86400000);

  const hours = Math.floor(
    (diff % 86400000) / 3600000
  );

  return days > 0
    ? `${days}d ${hours}h`
    : `${hours}h`;
}


function updateCountdowns() {

  document.querySelectorAll(".countdown").forEach(el => {

    el.textContent = countdownText(
      el.dataset.date
    );

  });

}

updateCountdowns();

setInterval(updateCountdowns, 60000);


function openAnimal(
  name,
  type,
  age,
  weight,
  price,
  img,
  expiry
) {

  document.getElementById("modalName").textContent = name;

  document.getElementById("modalType").textContent = type;

  document.getElementById("modalAge").textContent = age;

  document.getElementById("modalWeight").textContent = weight;

  document.getElementById("modalPrice").textContent = price;

  document.getElementById("modalExpiry").textContent = expiry;

  document.getElementById("modalImg").src = img;

  document
    .getElementById("animalModal")
    .classList.add("active");

  document
    .getElementById("animalModal")
    .setAttribute("aria-hidden", "false");

}


function closeAnimal() {

  document
    .getElementById("animalModal")
    .classList.remove("active");

  document
    .getElementById("animalModal")
    .setAttribute("aria-hidden", "true");

}


document
  .getElementById("animalModal")
  .addEventListener("click", e => {

    if (e.target.id === "animalModal") {
      closeAnimal();
    }

  });


document.addEventListener("keydown", e => {

  if (e.key === "Escape") {
    closeAnimal();
  }

});


function interest() {

  const name =
    document.getElementById("modalName").textContent;

  closeAnimal();

  document.getElementById("mensagem").value =
    `Olá! Tenho interesse no animal: ${name}. Gostaria de receber mais informações.`;

  document
    .getElementById("contato")
    .scrollIntoView({
      behavior: "smooth"
    });

  setTimeout(() => {
    document.getElementById("nome").focus();
  }, 500);

}


function showToast(message) {

  const toast =
    document.getElementById("toast");

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);

}


document
  .getElementById("contactForm")
  .addEventListener("submit", e => {

    e.preventDefault();

    showToast(
      "Mensagem preparada! Conecte este formulário ao seu WhatsApp/e-mail para receber os contatos."
    );

    e.target.reset();

  });