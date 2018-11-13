var pakutud = [];
var timerState = true; // kui timer jookseb nulli, siis ei saa enam otsinguid teha

var timeLeft = 10;

var donwloadTimer = setInterval(function () {
    document.getElementById("progressBar").value = 30 - --timeLeft;
    console.log(timeLeft)
    if (timeLeft <= 0) {
        timerState = false;
        console.log(timerState)
        clearInterval(donwloadTimer);
    }
}, 1000);

if (timerState) {
    $("#SearchButton").click(function () {
        $("#pakutudVastused").empty();
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

            // salvestab JSONi vastuse
            var data = JSON.parse(this.response);

            if (data[0] != undefined) {
                testArray = data[0].hasOwnProperty("name");
                console.log(testArray)
            } else {
                testArray = false;
            }

            //kui saadud vastuses on olemas, siis vaatab kas see vastus eksisteerib
            if (testArray) {
                console.log(data);
                console.log(data[0]["name"]);
                $("#displayData").append("<div id='response'><h3>" + searchTermin + " on olemas" + "</h3><p></div>");
                if (!(data[0]["name"] in pakutud)) {
                    pakutud.push(data[0]["name"])
                }

            } else {
                console.log("Something went wrong"); //Kui sisendil puudub vastus, siis tagastab selle sõnumi
                $("#displayData").append("<div id='response'><h3>Riiki ei eksisteeri</h3></div>");
            }
        };


        $("#pakutudVastused").append("<div id='vastused'><h3>" + pakutud + "</h3><p></div>");

//Saadab requesti
        request.send();
    });
}

