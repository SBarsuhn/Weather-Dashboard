const searchEl = $(".searchbar");

let cityArray = JSON.parse(localStorage.getItem("cities")) || [];
$(function () {
  let currentdate = dayjs().format("ddd MMM D YYYY");
  $("#date").text(currentdate);

  function setRecent(city) {
    let recentButton = $(`
      <button id="recentsearch">${city}</button>
      `);
      $(recentcities).append(recentButton);
      $(recentButton).on("click", function () {
        getWeather($(this).text());
        
      });
    }
  function getWeather(city) {
    let apiUrl =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&appid=61aa3733fa83482d5be3ca86bd4a8fdf";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
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
  $(".searchbtn").on("click", function (event) {
    event.preventDefault();
    let city = $(".searchbar").val();
    cityArray.push(city);
    localStorage.setItem("cities", JSON.stringify(cityArray));
   
    if (city) {
      setRecent(city);
      getWeather(city);
      // want to clear the input field after a search
    } else {
      alert("please enter a city name");
    }

   
  });
  for (let i = 0; i < cityArray.length; i++) {
    setRecent(cityArray[i]);
  }
  for (let i = 0; i < cityArray.length; i++) {
    getWeather(cityArray[0]);
  }
});

