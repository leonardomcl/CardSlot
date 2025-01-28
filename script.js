const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const dec = async (i, ms) => (await delay(ms), --i);

const btnPlay = document.querySelector(".play");
const areaResults = document.querySelectorAll(".area-slot");
const itemResults = document.querySelectorAll(".item-result");
const playAudio = new Audio('play.mp3');
const winAudio = new Audio("win.mp3");
const saldoInput = document.querySelector("#saldo");

let saldoInicial = 1000;
let lastGameResult = [];

function initializePage() {
  saldoInput.innerHTML = saldoInicial;
}

async function handlePlayButtonClick() {
  saldoInicial -= 10;
  saldoInput.innerHTML = saldoInicial;

  btnPlay.setAttribute('disabled', 'disabled');
  playAudio.play();

  await resetResultArea();
  await rollOptions();
  await checkResult();

  btnPlay.removeAttribute('disabled');
}

document.addEventListener("DOMContentLoaded", initializePage);
btnPlay.addEventListener("click", handlePlayButtonClick);

async function resetResultArea() {


  itemResults.textContent = "";

  await delay(200);

  areaResults.forEach(areaResult => {
    areaResult.classList.remove("area-slot-win");
  });

  await delay(100);
}

async function rollOptions() {
  const options = ["♠️", "♣️", "♥️", "♦️", "🃏", "🎴"];

  
  var total = 10;


  while (total = await dec(total, 360)) {
    itemResults.forEach(async (itemResult) => {
      itemResult.classList.add("item-result-move");
      itemResult.textContent = options[(Math.floor(Math.random() * options.length))];
      await delay(160);
      itemResult.classList.remove("item-result-move");

    });

  }
}

async function checkResult() {
  lastGameResult = [];

  itemResults.forEach(async (itemResult) => {
    lastGameResult.push(itemResult.textContent);
  });



  lastGameResult[0] === lastGameResult[1] && lastGameResult[1] === lastGameResult[2] ? winSlot([0, 1, 2]) : null;

  lastGameResult[3] === lastGameResult[4] && lastGameResult[4] === lastGameResult[5] ? winSlot([3, 4, 5]) : null;

  lastGameResult[6] === lastGameResult[7] && lastGameResult[7] === lastGameResult[8] ? winSlot([6, 7, 8]) : null;

  lastGameResult[0] === lastGameResult[4] && lastGameResult[4] === lastGameResult[8] ? winSlot([0, 4, 8]) : null;

  lastGameResult[6] === lastGameResult[4] && lastGameResult[4] === lastGameResult[2] ? winSlot([6, 4, 2]) : null;

  lastGameResult[0] === lastGameResult[4] && lastGameResult[4] === lastGameResult[2] ? winSlot([0, 4, 2]) : null;

  lastGameResult[6] === lastGameResult[4] && lastGameResult[4] === lastGameResult[8] ? winSlot([6, 4, 8]) : null;

}

function winSlot(slot) {

  for (let index = 0; index < slot.length; index++) {
    areaResults[slot[index]].classList.add("area-slot-win");
  }

  saldoInicial += 30;
  saldoInput.innerHTML = saldoInicial;

  winAudio.play();
}