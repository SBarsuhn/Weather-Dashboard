const searchEl = $(".searchbar");
// This grabs the local storage when the page is loading. if there is nothing in the local storage it will set the array to be empty so there are no bugs
let cityArray = JSON.parse(localStorage.getItem("cities")) || [];
// This is here so all of the main functions will only execute after the page is loaded
$(function () {
  // This section uses Dayjs to grab the current date and displays it on the main card
  let currentdate = dayjs().format("ddd MMM D YYYY");
  $("#date").text(currentdate);
  // This function creates the recent search buttons and lets the user click them to view other cities
  function setRecent(city) {
    let recentButton = $(`
      <button id="recentsearch">${city}</button>
      `);
    $(recentcities).append(recentButton);
    $(recentButton).on("click", function () {
      getWeather($(this).text());
    });
  }
  // This function takes the input from the search bar and puts it into the API call. It then fetches the information and adds it to the corresponding sections of the card
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
        // This section is for the five day forcast. It uses a different API call that uses latitude and longitude so it grabs that information from the first call and puts it into the new one
        fetch(
          "https://api.openweathermap.org/data/2.5/forecast?lat=" +
            lat +
            "&lon=" +
            lon +
            "&units=imperial&appid=61aa3733fa83482d5be3ca86bd4a8fdf"
        )
          // Since this fetch request has information from multiple times of the day on different days I decided tto have it just take the information from 12pm each day
          .then((response) => response.json())
          .then((weekresponse) => {
            let fiveDayArray = weekresponse.list.filter((day) =>
              day.dt_txt.includes("12:00:00")
            );
            // This clears the previous cards if there were any so the page doesn't pile up with old cards
            $(".cardcontainer").empty();
            // Then it takes that information and puts it onto 5 cards to display at the bottom of the page
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
  // This is what tells the geatWeather function what to use as the city input. It also puts the city input into local storage to be used later
  $(".searchbtn").on("click", function (event) {
    event.preventDefault();
    let city = $(".searchbar").val();
    cityArray.push(city);
    localStorage.setItem("cities", JSON.stringify(cityArray));

    if (city) {
      setRecent(city);
      getWeather(city);
      // Prevents the user from searching if there is nothing in the search bar
    } else {
      alert("please enter a city name");
    }
  });
  for (let i = 0; i < cityArray.length; i++) {
    setRecent(cityArray[i]);
  }
  // if the user has local storage information from the site already it will load the page while showing the information and forecast from the first item in the recent search array
  for (let i = 0; i < cityArray.length; i++) {
    getWeather(cityArray[0]);
  }
});
