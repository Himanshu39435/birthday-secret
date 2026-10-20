sessionStorage.removeItem("birthday-surprise-unlocked");

const PASSCODE = "2004";
const birthdayMessage = `I hope this year brings you everything you've been wishing for and so much more.

Thank you for making my days happier, my bad days easier, and life a little more beautiful just by being in it. 🥹💗

I'm so lucky to have you. Here's to more laughter, crazy memories, and all the happiness you deserve.

Happy birthday, my friend. You mean more than you know. 🎁❤️`;

let enteredCode = "";
let typingTimer;
const openedGifts = new Set();
let countdownStep = 0;
const giftMessages = [
  "A lifetime of laughter and unforgettable memories! 🎉",
  "A big hug and a reminder that you are truly special. 💗",
  "Wishing you happiness, success, and every dream come true! 🌟"
];

function go(number) {
  document.querySelectorAll(".screen").forEach(screen => screen.classList.remove("active"));
  document.getElementById(`s${number}`).classList.add("active");
  if (number === 4) startBirthdayLetter();
}

function swayMemory(card) {
  card.classList.remove("sway");
  void card.offsetWidth;
  card.classList.add("sway");
}

function renderCode() {
  document.querySelectorAll("#dots i").forEach((dot, index) => {
    dot.classList.toggle("filled", index < enteredCode.length);
  });
}

function pressKey(key) {
  if (enteredCode.length >= 4) return;
  enteredCode += key;
  document.getElementById("passwordError").textContent = "";
  renderCode();
  if (enteredCode.length === 4) checkPassword();
}

function clearCode() {
  enteredCode = enteredCode.slice(0, -1);
  document.getElementById("passwordError").textContent = "";
  renderCode();
}

function checkPassword() {
  if (enteredCode === PASSCODE) {
    go(2);
  } else if (enteredCode.length === 4) {
    document.getElementById("passwordError").textContent = "Oops! Try again ❤️";
    setTimeout(() => { enteredCode = ""; renderCode(); }, 600);
  }
}

function openGift(index) {
  openedGifts.add(index);
  const gift = document.querySelectorAll(".gift")[index];
  gift.innerHTML = `<span>${["🎉", "💖", "🌟"][index]}</span><b>Opened!</b>`;
  document.getElementById("giftMessage").textContent = giftMessages[index];
  if (openedGifts.size === 3) document.getElementById("continueGift").hidden = false;
}

function startBirthdayLetter() {
  clearTimeout(typingTimer);
  const element = document.getElementById("letter");
  const cardButton = document.getElementById("cardButton");
  element.textContent = "";
  cardButton.hidden = true;
  let index = 0;
  function typeNext() {
    if (!document.getElementById("s4").classList.contains("active")) return;
    if (index < birthdayMessage.length) {
      element.textContent += birthdayMessage[index++];
      typingTimer = setTimeout(typeNext, 25);
    } else {
      cardButton.hidden = false;
    }
  }
  typeNext();
}

function restart() {
  clearTimeout(typingTimer);
  enteredCode = "";
  openedGifts.clear();
  document.querySelectorAll(".gift").forEach((gift, index) => {
    gift.innerHTML = `<span>🎀</span><b>Gift ${index + 1}</b>`;
  });
  document.getElementById("giftMessage").textContent = "Three little gifts, made with love 💗";
  document.getElementById("continueGift").hidden = true;
  renderCode();
  go(1);
}

function startMidnightReveal() {
  const countdown = document.getElementById("countdown");
  const times = ["11:59:58", "11:59:59", "12:00:00"];
  const timer = setInterval(() => {
    countdownStep++;
    countdown.textContent = times[Math.min(countdownStep, times.length - 1)];
    if (countdownStep >= times.length - 1) {
      clearInterval(timer);
      setTimeout(() => { window.location.href = "passcode.html"; }, 450);
    }
  }, 850);
}

startMidnightReveal();
