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

//KELL

// Mitu sekundit loeb
var milleniLoeme = 30
// Counter, mis suureneb 1000 võrra igal loopil
var now = 0

// Iga sekundi tagant taaskäivitub
var x = setInterval(function() {

    document.getElementById("progressBar").value = now;
    
    // Lahutab pikkusest igas sekundis suureneva muutuja, kontroll et teada, kas aeg otsas ja sekundid printimiseks
    var kontroll = milleniLoeme * 1000 - now;
    
    var sekundid = (milleniLoeme * 1000 - now) / 1000
    now += 1000;
    
    // Output the result in an element with id="demo"
    document.getElementById("timer").innerHTML = sekundid+ " sekundit jäänud.";
    
    // If the count down is over, write some text 
    if (kontroll < 1001) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "Aeg sai otsa.";
        window.otsas = true;
        console.log(otsas);
    }
}, 1000);

var aegOtsas;
function foo() {
		window.otsas = false;
}
