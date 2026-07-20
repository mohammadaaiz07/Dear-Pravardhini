/*=========================================================
                AOS
=========================================================*/
AOS.init({
  duration: 1000,
  once: true,
});

/*=========================================================
                BACKGROUND MUSIC
=========================================================*/

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let playing = false;

if (musicBtn) {
  musicBtn.addEventListener("click", () => {
    if (!playing) {
      music.play();
      playing = true;
      musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause Music';
    } else {
      music.pause();
      playing = false;
      musicBtn.innerHTML = '<i class="fa-solid fa-music"></i> Play Music';
    }
  });
}

/*=========================================================
                HERO BUTTON
=========================================================*/

const openLetter = document.getElementById("openLetter");

if (openLetter) {
  openLetter.addEventListener("click", () => {
    document.getElementById("letter").scrollIntoView({
      behavior: "smooth",
    });
  });
}

/*=========================================================
            MANUAL MEMORIES SLIDER
=========================================================*/

const slider = document.getElementById("slider");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const dots = document.querySelectorAll(".dot");

let currentIndex = 0;

function updateDots() {
  dots.forEach((dot) => dot.classList.remove("active"));

  if (dots[currentIndex]) {
    dots[currentIndex].classList.add("active");
  }
}

function moveSlider(index) {
  const cards = document.querySelectorAll(".memory-card");

  if (cards.length === 0) return;

  const width = cards[0].offsetWidth + 30;

  slider.scrollTo({
    left: index * width,
    behavior: "smooth",
  });

  currentIndex = index;

  updateDots();
}

if (nextBtn) {
  nextBtn.onclick = () => {
    const cards = document.querySelectorAll(".memory-card");

    if (currentIndex < cards.length - 1) {
      moveSlider(currentIndex + 1);
    }
  };
}

if (prevBtn) {
  prevBtn.onclick = () => {
    if (currentIndex > 0) {
      moveSlider(currentIndex - 1);
    }
  };
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    moveSlider(index);
  });
});

/*=========================================================
            3D RING BOX
=========================================================*/

const ringBox = document.getElementById("ringBox");

const proposalCard = document.getElementById("proposalCard");

const popup = document.getElementById("popup");

const closePopup = document.getElementById("closePopup");

if (ringBox) {
  ringBox.addEventListener("click", () => {
    ringBox.classList.add("open");

    setTimeout(() => {
      proposalCard.classList.add("show");
    }, 800);

    setTimeout(() => {
      popup.classList.add("show");

      createConfetti();
    }, 1500);
  });
}

if (closePopup) {
  closePopup.onclick = () => {
    popup.classList.remove("show");
  };
}

/*=========================================================
            TYPING EFFECT
=========================================================*/

const paragraphs = document.querySelectorAll(".typing-text p");

paragraphs.forEach((p, i) => {
  p.style.opacity = "0";

  setTimeout(() => {
    p.style.transition = "1s";

    p.style.opacity = "1";
  }, i * 400);
});

/*=========================================================
            FLOATING HEARTS
=========================================================*/

function createHeart() {
  const heart = document.createElement("div");

  heart.innerHTML = "❤️";

  heart.style.position = "fixed";

  heart.style.left = Math.random() * 100 + "vw";

  heart.style.bottom = "-30px";

  heart.style.fontSize = Math.random() * 20 + 20 + "px";

  heart.style.pointerEvents = "none";

  heart.style.zIndex = "999";

  heart.style.transition = "5s linear";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.style.bottom = "110vh";

    heart.style.opacity = "0";
  }, 100);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createHeart, 1500);

/*=========================================================
            CONFETTI
=========================================================*/

function createConfetti() {
  for (let i = 0; i < 120; i++) {
    const confetti = document.createElement("span");

    confetti.style.position = "fixed";

    confetti.style.left = Math.random() * 100 + "vw";

    confetti.style.top = "-20px";

    confetti.style.width = "10px";

    confetti.style.height = "10px";

    confetti.style.borderRadius = "50%";

    const colors = [
      "#ff4f87",
      "#FFD700",
      "#87CEFA",
      "#90EE90",
      "#FF69B4",
      "#ffffff",
    ];

    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    confetti.style.pointerEvents = "none";

    confetti.style.zIndex = "9999";

    document.body.appendChild(confetti);

    confetti.animate(
      [
        {
          transform: "translateY(0) rotate(0deg)",
        },
        {
          transform: "translateY(110vh) rotate(720deg)",
        },
      ],
      {
        duration: 3000 + Math.random() * 3000,
        easing: "linear",
      },
    );

    setTimeout(() => {
      confetti.remove();
    }, 6000);
  }
}

/*=========================================================
            BUTTON RIPPLE EFFECT
=========================================================*/

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function (e) {
    const circle = document.createElement("span");

    const size = 150;

    circle.style.width = circle.style.height = size + "px";

    circle.style.position = "absolute";

    circle.style.borderRadius = "50%";

    circle.style.background = "rgba(255,255,255,.5)";

    circle.style.left = e.offsetX - size / 2 + "px";

    circle.style.top = e.offsetY - size / 2 + "px";

    circle.style.transform = "scale(0)";

    circle.style.animation = "ripple .7s linear";

    circle.style.pointerEvents = "none";

    this.style.position = "relative";

    this.style.overflow = "hidden";

    this.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 700);
  });
});

/*=========================================================
            RIPPLE CSS
=========================================================*/

const style = document.createElement("style");

style.innerHTML = `
@keyframes ripple{
from{
transform:scale(0);
opacity:.8;
}
to{
transform:scale(4);
opacity:0;
}
}
`;

document.head.appendChild(style);
