let menu = document.querySelector("header>span");
let sidebar = document.querySelector("aside");
let day = document.querySelector(".weekday");
let tablecontent = document.querySelector(".isolation");
let push_pull_legs = document.querySelector(".push_pull_legs");
let muscle = document.querySelector(".muscle_isolation");
let muscle2 = document.querySelector(".muscle_push_pull_legs");
let muscle3 = document.querySelector(".muscle_gym")
let core_cardio = document.querySelector(".core_cardio");
let mainBody = document.querySelector("main");
let gym_schedule = document.querySelector(".gym_body")
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
let timetable2 = [];
let timetable3 = [];
fetch(`./json/isolation.json`)
  .then((response) => response.json())
  .then((data) => {
    timetable = data.workout;
    fetch(`./json/push_pull_legs.json`)
      .then((response) => response.json())
      .then((data) => {
        timetable2 = data.workout;
        fetch(`./json/gym.json`)
          .then((response) => response.json())
          .then((data) => {
            timetable3 = data.workout;
            getschedule(date);
          });
      });
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
  if (date.getDay() != 0) {
    document.querySelector(".table.muscle_push_pull_legs").style.display =
      "block";
    muscle2.style.display = "block";
    document.querySelector(".table.gym").style.display =
      "block";
    muscle3.style.display = "block";
    for (let i = 0; i < 7; i++) {
      if (date.getDay() == i) {
        weekday = days[date.getDay()];
        day.innerHTML = weekday;
        if (date.getDay() != 0 && date.getDay() % 2 == 0) {
          core_cardio.style.display = "block";
          core_cardio.innerHTML = "Core";
        }else {
          core_cardio.innerHTML = "Cardio";
        }
        let daytimetable = getDayTimeTable(weekday);
        let push_pull_legs_timetable = getTimeTable2(weekday);
        let gym_schedule = getTimeTable3(weekday);
        muscle3.innerHTML = gym_schedule.muscle + " - Gym";
        muscle2.innerHTML = push_pull_legs_timetable.muscle;
        muscle.innerHTML = daytimetable.muscle;
        setTimetable(daytimetable.exercises);
        printtimetable(str);
        str = "";
        setTimetable(push_pull_legs_timetable.exercises);
        printtimetable2(str);
        str = "";
        setTimetable(gym_schedule.exercises);
        printtimetable3(str);
        str = "";
      }
    }
  } else {
    core_cardio.innerHTML = "Stretching";
    document.querySelector(".table.muscle_push_pull_legs").style.display =
      "none";
    muscle2.style.display = "none";
    document.querySelector(".table.gym").style.display =
      "none";
    muscle3.style.display = "none";
    weekday = days[date.getDay()];
    day.innerHTML = weekday;
    let sundayTimeTable = getDayTimeTable("Tuesday");
    muscle.innerHTML = sundayTimeTable.muscle;
    setTimetable(sundayTimeTable.exercises);
    printtimetable(str);
    str = "";
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

function getTimeTable2(day) {
  if (day == "Monday") {
    return timetable2.Monday;
  }
  if (day == "Tuesday") {
    return timetable2.Tuesday;
  }
  if (day == "Wednesday") {
    return timetable2.Wednesday;
  }
  if (day == "Thursday") {
    return timetable2.Thursday;
  }
  if (day == "Friday") {
    return timetable2.Friday;
  }
  if (day == "Saturday") {
    return timetable2.Saturday;
  }
  if (day == "Sunday") {
    return timetable2.Sunday;
  }
}

function getTimeTable3(day) {
  if (day == "Monday") {
    return timetable3.Monday;
  }
  if (day == "Tuesday") {
    return timetable3.Tuesday;
  }
  if (day == "Wednesday") {
    return timetable3.Wednesday;
  }
  if (day == "Thursday") {
    return timetable3.Thursday;
  }
  if (day == "Friday") {
    return timetable3.Friday;
  }
  if (day == "Saturday") {
    return timetable3.Saturday;
  }
  if (day == "Sunday") {
    return timetable3.Sunday;
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

function printtimetable2(string) {
  push_pull_legs.innerHTML = string;
}

function printtimetable3(string) {
  gym_schedule.innerHTML = string;
}
