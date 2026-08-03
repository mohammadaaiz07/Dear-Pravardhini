/*=========================================================
                AOS
=========================================================*/
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 1000,
    once: true
  });
}

/*=========================================================
                BACKGROUND MUSIC
=========================================================*/

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let playing = false;

if (musicBtn && music) {
  musicBtn.addEventListener("click", () => {
    if (!playing) {
      music.play()
        .then(() => {
          playing = true;
          musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause Music';
        })
        .catch(err => {
          console.warn("Playback blocked:", err);
        });
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
const letterSection = document.getElementById("letter");

if (openLetter && letterSection) {
  openLetter.addEventListener("click", () => {
    letterSection.scrollIntoView({ behavior: "smooth" });
  });
}

/*=========================================================
            MANUAL MEMORIES SLIDER
=========================================================*/

const slider = document.getElementById("slider");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const dots = document.querySelectorAll(".dot");
const memoryCards = document.querySelectorAll(".memory-card");

let currentIndex = 0;

function updateDots() {
  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[currentIndex]) {
    dots[currentIndex].classList.add("active");
  }
}

function moveSlider(index) {
  if (!slider || memoryCards.length === 0) return;

  const width = memoryCards[0].offsetWidth + 30;

  slider.scrollTo({
    left: index * width,
    behavior: "smooth"
  });

  currentIndex = index;
  updateDots();
}

if (nextBtn) {
  nextBtn.onclick = () => {
    if (currentIndex < memoryCards.length - 1) {
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

    if (proposalCard) {
      setTimeout(() => {
        proposalCard.classList.add("show");
      }, 800);
    }

    if (popup) {
      setTimeout(() => {
        popup.classList.add("show");
        createConfetti();
      }, 1500);
    }
  });
}

if (closePopup && popup) {
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

  requestAnimationFrame(() => {
    heart.style.bottom = "110vh";
    heart.style.opacity = "0";
  });

  setTimeout(() => {
    heart.remove();
  }, 5100);
}

const heartInterval = setInterval(createHeart, 1500);
// To stop hearts later if needed: clearInterval(heartInterval);

/*=========================================================
            CONFETTI
=========================================================*/

function createConfetti() {
  const colors = ["#ff4f87", "#FFD700", "#87CEFA", "#90EE90", "#FF69B4", "#ffffff"];

  for (let i = 0; i < 120; i++) {
    const confetti = document.createElement("span");
    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-20px";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.borderRadius = "50%";
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.pointerEvents = "none";
    confetti.style.zIndex = "9999";

    document.body.appendChild(confetti);

    const duration = 3000 + Math.random() * 3000;

    confetti.animate(
      [
        { transform: "translateY(0) rotate(0deg)" },
        { transform: "translateY(110vh) rotate(720deg)" }
      ],
      { duration, easing: "linear" }
    );

    setTimeout(() => {
      confetti.remove();
    }, duration + 100);
  }
}

/*=========================================================
            BUTTON RIPPLE EFFECT
=========================================================*/

document.querySelectorAll("button").forEach(button => {
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

const rippleStyle = document.createElement("style");
rippleStyle.innerHTML = `
@keyframes ripple {
  from { transform: scale(0); opacity: .8; }
  to { transform: scale(4); opacity: 0; }
}
`;
document.head.appendChild(rippleStyle);
