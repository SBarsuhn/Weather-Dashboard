const searchEl = document.querySelector(".searchbar");
// NEED TO GET LOCAL STORASGE WORKING CORRECTLY

$(function () {
  let currentdate = dayjs().format("ddd MMM D YYYY");
  $("#date").text(currentdate);
  localStorage.getItem(recentcities);

  $(".searchbtn").on("click", function (event) {
    event.preventDefault();
    let city = $(".searchbar").val();
    if (city) {
      searchEl.textContent = "";
      setRecent();
      getWeather();
    } else {
      alert("please enter a city name");
    }
    function setRecent() {
      const recentObj = city;
      // console.log(recentObj)
      let recentButton = $(`
        <button id="recentsearch">
        ${recentObj}</button>
        `);
      $(recentcities).append(recentButton);
      localStorage.setItem(recentButton, recentcities);
    }
    // NEED TO GET RECENT BUTTON TO WORK CORRECTLY
    $("#recentsearch").on("click", function (event) {
      event.preventDefault();
      //  need to set city = to the text on the button

      getWeather();
    });

    function getWeather() {
      let apiUrl =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=imperial&appid=61aa3733fa83482d5be3ca86bd4a8fdf";
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          let icon = data.list[0].weather[0].icon;
          let iconUrl = `https://openweathermap.org/img/w/${icon}.png`;

          let cityName = $(`
        <div>${data.city.name}
        </div>
        
        `);
          $("#name").html(cityName);

          let temp = $(`
        <p> TEMP: ${data.list[0].main.temp}
        </p>`);
          $("#temp").html(temp);

          let wind = $(`
        <p> WIND: ${data.list[0].wind.speed}
        </p>`);
          $("#wind").html(wind);

          let humidity = $(`
        <p> HUMIDITY: ${data.list[0].main.humidity}
        </p>`);
          $("#humidity").html(humidity);

          let iconEl = $(`
        <img src = ${iconUrl}
        />`);
          $(".image").html(iconEl);

          let lat = data.city.coord.lat;
          let lon = data.city.coord.lon;

          fetch(
            "https://api.openweathermap.org/data/2.5/forecast?lat=" +
              lat +
              "&lon=" +
              lon +
              "&units=imperial&appid=61aa3733fa83482d5be3ca86bd4a8fdf"
          )
            .then((response) => response.json())
            .then((weekresponse) => {
              // console.log(weekresponse);

              let fiveDayArray = weekresponse.list.filter((day) =>
                day.dt_txt.includes("12:00:00")
              );
              $(".cardcontainer").empty();

              for (let i = 0; i < fiveDayArray.length; i++) {
                let today = new Date(fiveDayArray[i].dt_txt)
                  .toLocaleString()
                  .split(",")[0];

                let fiveDayIcon = fiveDayArray[i].weather[0].icon;
                let fiveDayIconUrl = `https://openweathermap.org/img/w/${fiveDayIcon}.png`;
                let fiveDayCard = $(`
              <div class="cards" id="cards">
              <h2>
              ${today}
              </h2>
              <img
              src = "${fiveDayIconUrl}"
              />
              <p>
              TEMP: ${fiveDayArray[i].main.temp}
              </p>
              <p>
              HUMIDITY: ${fiveDayArray[i].main.humidity}
              </p>
              <p>
              WIND: ${fiveDayArray[i].wind.speed}
              </p>
              </div>
              `);
                $(".cardcontainer").append(fiveDayCard);
              }
            });
        });
    }
  });
});

// apiKey = "61aa3733fa83482d5be3ca86bd4a8fdf"

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=imperial&appid=61aa3733fa83482d5be3ca86bd4a8fdf

// api.openweathermap.org/data/2.5/forecast?q=[CITY NAME]&units=imperial&appid=61aa3733fa83482d5be3ca86bd4a8fdf
