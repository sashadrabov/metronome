let tempo = 60;
let isPlaying = false;
let timer;
let click = new Audio("click.mp3");
let noteDuration = [1, 4]; // initial value is a fraction
let durationElement = document.getElementById("noteDurationButton");

function playClick() {
  click.currentTime = 0;
  click.play();
}

function setTempo(newTempo) {
  tempo = Math.max(newTempo, 1); // ensure tempo is at least 1 bpm
  document.getElementById("tempo").innerText = tempo;
  if (isPlaying) {
    clearInterval(timer);
    timer = setInterval(playClick, calculateDuration(noteDuration));
  }
}

function calculateDuration(noteDuration) {
  let duration = (60000 / tempo) * (noteDuration[0] / noteDuration[1]) * 4;
  return duration;
}

function startStop() {
  if (isPlaying) {
    clearInterval(timer);
    isPlaying = false;
    document.getElementById("startStopButton").innerText = "START";
  } else {
    timer = setInterval(playClick, calculateDuration(noteDuration));
    isPlaying = true;
    document.getElementById("startStopButton").innerText = "STOP";
  }
}

function increaseTempo() {
  setTempo(tempo + 10);
}

function decreaseTempo() {
  setTempo(tempo - 10);
}

function increaseTempoByOne() {
  setTempo(tempo + 1);
}

function decreaseTempoByOne() {
  setTempo(tempo - 1);
}

function increaseTempoByFive() {
  setTempo(tempo + 5);
}

function decreaseTempoByFive() {
  setTempo(tempo - 5);
}

function setNoteDuration(duration) {
  noteDuration = duration;
  durationElement.innerText = noteDuration[0] + '/' + noteDuration[1]; // update the displayed fraction
  if (isPlaying) {
    clearInterval(timer);
    timer = setInterval(playClick, calculateDuration(noteDuration));
  }
}

function doubleNoteDuration() {
  noteDuration[1] *= 2;
  simplifyFraction(noteDuration);
  setNoteDuration(noteDuration);
}

function halveNoteDuration() {
  noteDuration[1] /= 2;
  if (noteDuration[1] < 1) {
    noteDuration[0] *= 2;
    noteDuration[1] = 1;
  }
  simplifyFraction(noteDuration);
  setNoteDuration(noteDuration);
}
// Simplify the fraction by dividing both the numerator and denominator by their greatest common divisor
function simplifyFraction(fraction) {
  let gcd = findGCD(fraction[0], fraction[1]);
  fraction[0] /= gcd;
  fraction[1] /= gcd;
}

function findGCD(a, b) {
  return b == 0 ? a : findGCD(b, a % b);
}

document.getElementById("startStopButton").addEventListener("click", startStop);
document.getElementById("incTempoButton").addEventListener("click", increaseTempo);
document.getElementById("decTempoButton").addEventListener("click", decreaseTempo);
document.getElementById("doubleNoteDurationButton").addEventListener("click", doubleNoteDuration);
document.getElementById("halveNoteDurationButton").addEventListener("click", halveNoteDuration);
document.getElementById("incTempoByOneButton").addEventListener("click", increaseTempoByOne);
document.getElementById("decTempoByOneButton").addEventListener("click", decreaseTempoByOne);
document.getElementById("incTempoByFiveButton").addEventListener("click", increaseTempoByFive);
document.getElementById("decTempoByFiveButton").addEventListener("click", decreaseTempoByFive);
document.getElementById("taptempo").addEventListener("click", function() {
  let currentTime = new Date().getTime();
  if (lastTapTime) {
    let timeDiff = currentTime - lastTapTime;
    let newTempo = Math.round(60000 / timeDiff);
    setTempo(newTempo);
  }
  lastTapTime = currentTime;
});




let lastTapTime;

document.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    event.preventDefault();
    startStop();
  } else if (event.code === "Enter") {
    event.preventDefault();
    let currentTime = new Date().getTime();
    if (lastTapTime) {
      let timeDiff = currentTime - lastTapTime;
      let newTempo = Math.round(60000 / timeDiff);
      setTempo(newTempo);
    }
    lastTapTime = currentTime;
  } else if (event.code === "ArrowLeft" && !event.shiftKey && !event.ctrlKey) {
    event.preventDefault();
    decreaseTempo();
  } else if (event.code === "ArrowRight" && !event.shiftKey && !event.ctrlKey) {
    event.preventDefault();
    increaseTempo();
  } else if (event.code === "ArrowLeft" && event.shiftKey) {
    event.preventDefault();
    decreaseTempoByOne();
  } else if (event.code === "ArrowRight" && event.shiftKey) {
    event.preventDefault();
    increaseTempoByOne();
  } else if (event.code === "ArrowLeft" && event.ctrlKey) {
    event.preventDefault();
    decreaseTempoByFive();
  } else if (event.code === "ArrowRight" && event.ctrlKey) {
    event.preventDefault();
    increaseTempoByFive();
  } else if (event.code === "ArrowUp") {
    event.preventDefault();
    doubleNoteDuration();
  } else if (event.code === "ArrowDown") {
    event.preventDefault();
    halveNoteDuration();
  }
});

document.querySelectorAll("button").forEach(function(button) {
  button.addEventListener("click", function(event) {
    event.preventDefault();
  });
});