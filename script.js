// @ts-check

//#region connect to dom

/** @type {HTMLButtonElement | null} */
const startButton = document.querySelector("#start-button");

const pauseButton = document.querySelector("#pause-button");

/** @type {HTMLInputElement | null} */
const minutesElement = document.querySelector("input[name='minutes']");

/** @type {HTMLInputElement | null} */
const secondsElement = document.querySelector("input[name='seconds']");

//#endregion connect to dom

//#region check elements exist
if (!startButton || !pauseButton || !minutesElement || !secondsElement) {
  throw new Error("Element missing or typo in querySelector");
}
//#endregion check elements exist

//#region shared changing variables
let intervalId, timeoutId;

let state = localStorage.getItem("state") || "idle";
//#endregion shared changing variables

//#region event handling

//#region toggle pause

/**
 * @param {"started" | "paused"} newState
 */
function changeState(newState) {
  function change() {
    state = newState;
  }

  switch (state) {
    case "paused": {
      if (newState === "started") change();
    }
    case "started": {
      if (newState === "paused") change();
    }
    // from idle state
    default: {
      if (newState === "started") change();
    }
  }

  localStorage.setItem("state", state);
}

//#endregion toggle pause

const handleStartButtonClick = () => {
  changeState("started"); // idle -> started

  startButton.classList.add("hidden");
  pauseButton.classList.remove("hidden");

  const minutes = minutesElement.valueAsNumber || 0;
  const seconds = secondsElement.valueAsNumber || 0;

  const ms = (minutes * 60 + seconds) * 1000;

  const startedAt = Date.now();

  const tick = () => {
    const elapsedMs = Date.now() - startedAt;

    const remainingMs = Math.max(ms - elapsedMs, 0);

    const remainingSeconds = Math.ceil(remainingMs / 1000) % 60;
    const remainingMinutes = Math.floor(remainingMs / 1000 / 60);

    console.log({ elapsedMs, remainingMs, remainingSeconds, remainingMinutes });

    secondsElement.value = remainingSeconds.toString().padStart(2, "0");
    minutesElement.value = remainingMinutes.toString().padStart(2, "0");
  };

  intervalId = setInterval(tick, 1000);

  const finish = () => {
    console.log(`${ms} done`);

    startButton.classList.remove("hidden");
    pauseButton.classList.add("hidden");

    localStorage.clear();

    clearInterval(intervalId);
    clearTimeout(timeoutId);
  };

  // timeoutId = setTimeout(finish, ms);

  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  }).then(() => {
    finish();
  });
};

startButton.addEventListener("click", handleStartButtonClick);

const handlePauseButtonClick = () => {
  changeState("paused");

  localStorage.setItem("minutes", minutesElement.value);
  localStorage.setItem("seconds", secondsElement.value);

  clearInterval(intervalId);
  clearTimeout(timeoutId);

  startButton.classList.remove("hidden");
  pauseButton.classList.add("hidden");
};

pauseButton.addEventListener("click", handlePauseButtonClick);

//#endregion event handling

//#region on page load

const minutes = localStorage.getItem("minutes");
const seconds = localStorage.getItem("seconds");

if (minutes !== null && seconds !== null) {
  minutesElement.value = minutes;
  secondsElement.value = seconds;
}

//#endregion on page load
