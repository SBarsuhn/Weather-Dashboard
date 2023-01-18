const searchEl = document.querySelector(".searchbar");
const recentSearch = document.querySelector("#recentsearch");
// const apiKey = "61aa3733fa83482d5be3ca86bd4a8fdf"
$(function () {
  let currentdate = dayjs().format("ddd MMM D YYYY");
  $("#date").text(currentdate);

  $(".searchbtn").on("click", function (event) {
    event.preventDefault();
    let city = $(this).siblings(".searchbar").val();
    if (city) {
      searchEl.textContent = "";
      localStorage.setItem(recentSearch, city);
      console.log(localStorage);
      $("#recentsearch").text(city);
      getWeather();
    } else {
      alert("please enter a city name");
    }
    function getWeather() {
      let apiUrl =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=imperial&appid=61aa3733fa83482d5be3ca86bd4a8fdf";
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => showWeather(data));

      function showWeather(data) {
        const { name } = data;
        const { icon } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, temp, humidity, speed);
      }
    }
  });
});

// api.openweathermap.org/data/2.5/forecast?q=[CITY NAME]&appid=61aa3733fa83482d5be3ca86bd4a8fdf
// function getWeather() {
//   let apiUrl =
//     "https://api.openweathermap.org/data/2.5/forecast?q=" + city +"&appid=61aa3733fa83482d5be3ca86bd4a8fdf";
//   fetch(apiUrl).then(function (response) {
//     if (response.ok) {
//       console.log(response);
//     }
//   });
// };
