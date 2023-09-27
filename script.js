const time = document.getElementById("time");
const select = document.querySelectorAll("select");
const alarmBtn = document.querySelector(".alarmBtn");
const content = document.querySelector(".contents");
let ringtone = new Audio("./assets/ringtone.mp3");
let alarmTime,
  alarmStatus = false;

// for add times to <select>...</select> element in index.html
for (let i = 23; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  select[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  select[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// make a digital clock
setInterval(() => {
  const date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  time.innerHTML = `${h}:${m}:${s}`;
  if (alarmTime === `${h}:${m}`) {
    ringtone.play();
    ringtone.loop = true;
    document.querySelector(".clock").src = "./assets/Clock Ringing.png";
    document.querySelector(".clock").classList.add("animated");
  }
}, 1000);

alarmBtn.addEventListener("click", () => {
  alarmTime = `${select[0].value}:${select[1].value}`;
  if (alarmTime.includes("Hour") || alarmTime.includes("Minutes")) {
    return alert("Enter a valid time please!");
  }
  checkAlarm(alarmStatus);
});

// neccessary functional actions
function checkAlarm(state) {
  if (alarmStatus === false) {
    content.classList.add("disable");
    alarmBtn.innerHTML = "Clear Alarm";
    alarmStatus = true;
  } else if (alarmStatus === true) {
    content.classList.remove("disable");
    alarmBtn.innerHTML = "Set Alarm";
    alarmTime = "";
    document.querySelector(".clock").src = "./assets/Clock.png";
    document.querySelector(".clock").classList.remove("animated");
    ringtone.pause();
    alarmStatus = false;
  }
}
