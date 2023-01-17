$(function () {

    let currentdate = dayjs().format("ddd MMM D YYYY");
    $("#date").text(currentdate);


    // fetch()

    $(".searchbtn").on("click", function() {
        
        let citySearch = $(this).siblings(".searchbar").val();
        // let recentSearches = localStorage.getItem
        localStorage.setItem("citySearch", citySearch)
        console.log(localStorage)
        $("#recentsearch").text(citySearch)
    })


























});


// api.openweathermap.org/data/2.5/forecast?q=[CITY NAME]&appid=61aa3733fa83482d5be3ca86bd4a8fdf