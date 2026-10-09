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


const animalTrack = document.getElementById("animalTrack");
const animalProgress = document.getElementById("animalProgress");
const animalProgressTrack = document.querySelector(".carousel-progress");
const animalPrev = document.getElementById("animalPrev");
const animalNext = document.getElementById("animalNext");

function updateAnimalCarousel() {
  const maxScroll = animalTrack.scrollWidth - animalTrack.clientWidth;
  const scrollLeft = animalTrack.scrollLeft;
  const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;

  animalPrev.disabled = scrollLeft <= 5;
  animalNext.disabled = maxScroll <= 5 || scrollLeft >= maxScroll - 5;
  animalProgress.style.width = `${progress}%`;
  animalProgressTrack.setAttribute("aria-valuenow", `${Math.round(progress)}`);
}

document.querySelectorAll(".filter").forEach(btn => {

  btn.addEventListener("click", () => {

    document.querySelectorAll(".filter").forEach(b => {
      b.classList.remove("active");
    });

    btn.classList.add("active");

    const filter = btn.dataset.filter;

    document.querySelectorAll(".animal-card").forEach(card => {
      card.hidden = filter !== "todos" && card.dataset.category !== filter;
    });

    animalTrack.scrollTo({ left: 0, behavior: "smooth" });
    updateAnimalCarousel();

  });

});

animalPrev.addEventListener("click", () => {
  const card = animalTrack.querySelector(".animal-card:not([hidden])");
  const gap = parseFloat(getComputedStyle(animalTrack).gap) || 0;
  animalTrack.scrollBy({
    left: -(card.offsetWidth + gap),
    behavior: "smooth"
  });
});

animalNext.addEventListener("click", () => {
  const card = animalTrack.querySelector(".animal-card:not([hidden])");
  const gap = parseFloat(getComputedStyle(animalTrack).gap) || 0;
  animalTrack.scrollBy({
    left: card.offsetWidth + gap,
    behavior: "smooth"
  });
});

animalTrack.addEventListener("scroll", updateAnimalCarousel);
window.addEventListener("resize", updateAnimalCarousel);

let isDragging = false;
let dragStartX = 0;
let dragStartScroll = 0;

animalTrack.addEventListener("mousedown", event => {
  if (event.target.closest("button")) return;

  isDragging = true;
  dragStartX = event.pageX;
  dragStartScroll = animalTrack.scrollLeft;
});

animalTrack.addEventListener("mouseup", () => {
  isDragging = false;
});

animalTrack.addEventListener("mouseleave", () => {
  isDragging = false;
});

animalTrack.addEventListener("mousemove", event => {
  if (!isDragging) return;

  event.preventDefault();
  animalTrack.scrollLeft = dragStartScroll - (event.pageX - dragStartX);
});

updateAnimalCarousel();


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