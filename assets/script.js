const searchEl = document.querySelector(".searchbar");
const recentSearch = document.querySelector("#recentsearch");
$(function () {
  let currentdate = dayjs().format("ddd MMM D YYYY");
  $("#date").text(currentdate);

  $(".searchbtn").on("click", function (event) {
    event.preventDefault();
    let city = $(".searchbar").val();
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
        .then((data) => {console.log(data)
        let icon = data.list[0].weather[0].icon
        let iconUrl = `https://openweathermap.org/img/w/${icon}.png`
        
        let cityName = $(`
          <div>${data.city.name}
            </div>
          
            `);
            $("#name").append(cityName);
        let temp = $(`
        <p> TEMP: ${data.list[0].main.temp}
        </p>`)
        $("#temp").append(temp)

        let wind = $(`
        <p> WIND: ${data.list[0].wind.speed}
        </p>`)
        $("#wind").append(wind)

        let humidity = $(`
        <p> HUMIDITY: ${data.list[0].main.humidity}
        </p>`)
        $("#humidity").append(humidity)

        let iconEl = $(`
        <img src = "${iconUrl}"
        />`)
        $(".big-one").append(iconEl)

          let lat = data.city.coord.lat
          let lon = data.city.coord.lon
          console.log(lat, lon)

    });
        
      // function fiveDay() {
      //   // need to grab lat and lon from the data in the first fetch
      //   let fiveDayApi =
      //     "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      //     lat +
      //     "&lon=" +
      //     lon +
      //     "&units=imperial&appid=61aa3733fa83482d5be3ca86bd4a8fdf";
      //     fetch(fiveDayApi)
      //     .then((response) => response.json())
      //     .then((data) => console.log(data))

      // }
    }
  });
});

// apiKey = "61aa3733fa83482d5be3ca86bd4a8fdf"

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=imperial&appid=61aa3733fa83482d5be3ca86bd4a8fdf

// api.openweathermap.org/data/2.5/forecast?q=[CITY NAME]&units=imperial&appid=61aa3733fa83482d5be3ca86bd4a8fdf
