let menu = document.querySelector("header>span");
let sidebar = document.querySelector("aside");
let day = document.querySelector(".day");
let tablecontent = document.querySelector("tbody");
let muscle = document.querySelector(".muscle")
let str = "";

menu.addEventListener("click", () => {
  if (menu.innerHTML == "close") {
    sidebar.style.width = "0";
    menu.innerHTML = "menu";
  } else {
    sidebar.style.width = "80%";
    menu.innerHTML = "close";
  }
});
let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let timetable = [];
fetch(`./workout.json`)
  .then((response) => response.json())
  .then((data) => {
    timetable = data.workout;
    getschedule(date);
  });

function changeday(element) {
  if (innerWidth <= 700) {
    sidebar.style.width = "0";
    menu.innerHTML = "menu";
  }
  date = new Date(`March ${element.id}, 2021`);
  str = "";
  tablecontent.innerHTML = "";
  getschedule(date);
}

function getschedule(date) {
  for (let i = 0; i < 7; i++) {
    if (date.getDay() == i) {
      weekday = days[date.getDay()];
      day.innerHTML = weekday;
      daytimetable = getDayTimeTable(weekday)
      muscle.innerHTML = daytimetable.muscle;
      setTimetable(daytimetable.exercises);
    }
  }
}

function getDayTimeTable(day) {
  if (day == "Monday") {
    return timetable.Monday;
  }
  if (day == "Tuesday") {
    return timetable.Tuesday;
  }
  if (day == "Wednesday") {
    return timetable.Wednesday;
  }
  if (day == "Thursday") {
    return timetable.Thursday;
  }
  if (day == "Friday") {
    return timetable.Friday;
  }
  if (day == "Saturday") {
    return timetable.Saturday;
  }
  if (day == "Sunday") {
    return timetable.Sunday;
  }
}

function setTimetable(todaytt) {
  for (let i = 0; i < todaytt.length; i++) {
    const element = todaytt[i];
    sno = i + 1;
    exename = element.name;
    reps = element.reps;
    sets = element.sets;
    appendall(sno, exename, sets, reps);
  }
  printtimetable(str);
}

function appendall(sno, exename, sets, reps) {
  str += `<tr>
    <td>${sno}</td>
    <td>${exename}</td>
    <td>${sets}</td>
    <td>${reps}</td>
  </tr>
`;
}

function printtimetable(string) {
  tablecontent.innerHTML = string;
}
