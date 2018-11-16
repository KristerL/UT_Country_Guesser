var pakutud = [];
var timerState = true; // kui timer jookseb nulli, siis ei saa enam otsinguid teha

var timeLeft = 30;

//Kui search nupule vajutada, siis jookseb funktsioon
$("#SearchButton").click(function () {
    //Kui aeg ei ole otsas, siis otsimise funktsioon töötab
    if (timerState) {

        $("#pakutudVastused").empty();
        $("#displayData").empty();
        var searchTermin = $("#searchTermin").val();
        searchTermin = searchTermin.split(/[ ]+/).join('_');
        var searchUrl = "https://restcountries.eu/rest/v2/name/" + searchTermin;

        console.log("Search url: " + searchUrl);
        var request = new XMLHttpRequest();
        console.log("test123: " + timerState)


//kasutab GET-i, et avada uus request
        request.open("GET", searchUrl, true);


//Laeb JSONi siin
        request.onload = function () {


            // salvestab JSONi vastuse
            var data = JSON.parse(this.response);

            //kontrollib vastuse olemasolu
            if (data[0] != undefined) {
                testArray = data[0].hasOwnProperty("name");
                console.log("Kas eksisteerib name type returnis: " + testArray)
            } else {
                testArray = false;
            }

            //kui saadud vastuses on olemas, siis vaatab kas see vastus eksisteerib
            if (testArray) {
                console.log("Kogu andme objekt: " + data);
                console.log("Name type väärtus: " + data[0]["name"]);
                $("#displayData").append("<div id='response'><h3>" + "Viimane pakutud vastus: " + searchTermin + "</h3><p></div>");

                if ((pakutud.includes(data[0]["name"])) == false) {

                    pakutud.push(data[0]["name"])
                    console.log("Pakutud vastuste list: " + pakutud)
                    //setib aja uuesti 30 sekundi peale
                    timeLeft = 30;
                }

            } else {
                console.log("Something went wrong"); //Kui sisendil puudub vastus, siis tagastab selle sõnumi
                $("#displayData").append("<div id='response'><h3>Riiki ei eksisteeri</h3></div>");
            }
            $("#pakutudVastused").append("<div id='vastused'><h3>" + pakutud + "</h3><p></div>");
        };


//Saadab requesti
        request.send();
        //kuna otsimine toimus ja vastus leit

    }
});


setInterval(function () {
    document.getElementById("progressBar").value = 30 - --timeLeft;
    console.log(timeLeft)
    if (timeLeft <= 0) {
        timerState = false;
        console.log(timerState)
        clearInterval(donwloadTimer);
    }
}, 1000);




