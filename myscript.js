$("#SearchButton").click(function() {
    $("#displayData").empty();
    var searchTermin = $("#searchTermin").val();
    searchTermin = searchTermin.split(/[ ]+/).join('_');
    var searchUrl = "https://restcountries.eu/rest/v2/name/" + searchTermin;
    console.log(searchUrl);
    var request = new XMLHttpRequest();

//kasutab GET-i, et avada uus request
    request.open("GET", searchUrl, true);


//Laeb JSONi siin
    request.onload = function () {
        var data = JSON.parse(this.response);

        console.log(data);
        console.log(data[0]["name"]);
    };

//Saadab requesti
    request.send();
});

var timeLeft = 30;

var donwloadTimer = setInterval(function(){
    document.getElementById("progressBar").value = 30 - --timeLeft;
    if(timeLeft <= 0){
        clearInterval(donwloadTimer);
    }
},1000);

