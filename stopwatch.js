// const secondsElement = document.getElementById("seconds");
// const startButton = document.querySelector("#start-btn");
// const stopButton = document.querySelector("#stop-btn");

// let count=0;

// startButton.addEventListener("click",tick);

// let fg=true;

// stopButton.addEventListener("click",()=>{
//     fg=false;
// });

// async function tick(){
//     if(!fg) return;
//     await sleep(1000);
//     secondsElement.innerText = ++count;
//     tick();
// }
// function sleep(ms){
//     return new Promise((resolve)=>{
//         setTimeout(resolve,ms);
//     });
// }

// const secondsElement = document.getElementById("seconds");
// const startButton = document.querySelector("#start-btn");
// const stopButton = document.querySelector("#stop-btn");

// let count=0;

// startButton.addEventListener("click",tick);

// let fg=true;

// stopButton.addEventListener("click",()=>{
//     fg=false;
// });

// function tick(){
//     if(!fg) return;
//     sleep(1000).then(()=>{
//         secondsElement.innerText = ++count;
//         tick();
//     });
// }
// function sleep(ms){
//     return new Promise((resolve)=>{
//         setTimeout(resolve,ms);
//     });
// }

const stopwatchDisplay = document.querySelector('#seconds');
const startBtn = document.querySelector('#start-btn');
const stopButton = document.querySelector('#stop-btn');

let startTime;
let elapsedTime = 0;
let intervalID;

function updateStopwatch() {
    const now = Date.now();
    elapsedTime = now - startTime + elapsedTime;

    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const hours = Math.floor((elapsedTime / (1000 * 60 * 60)));

    stopwatchDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}


function startStopwatch() {
    startTime = Date.now();
    intervalID = setInterval(updateStopwatch, 1000); 
    startBtn.disabled = true;
}


function stopStopwatch() {
    clearInterval(intervalID);
    stopButton.disabled = true;
}

startBtn.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);