//list, msi hoiab pakutud vastuseid
var pakutud = [];
var pakutudPrint = [];
//pakutud riikid hulk
var pakutudNr = 0;


//KELL

// Mitu sekundit loeb
var milleniLoeme = 30
// Counter, mis suureneb 1000 võrra igal loopil
var now = 0

// Iga sekundi tagant taaskäivitub
var x = setInterval(function () {

    document.getElementById("progressBar").value = now;

    // Lahutab pikkusest igas sekundis suureneva muutuja, kontroll et teada, kas aeg otsas ja sekundid printimiseks
    var kontroll = milleniLoeme * 1000 - now;

    var sekundid = (milleniLoeme * 1000 - now) / 1000
    now += 1000;

    // Output the result in an element with id="demo"
    document.getElementById("timer").innerHTML = sekundid + " sekundit jäänud.";

    // If the count down is over, write some text
    if (kontroll < 1001) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "Aeg sai otsa.";
        document.getElementById("pakkumisteNr").innerHTML = "Teadsite " + pakutudNr + " riiki."
        window.otsas = true;
        console.log(otsas);
    }
}, 1000);


var aegOtsas;

function foo() {
    window.otsas = false;
    window.now = 0;
}


//Funktsioon, mis vastutab otsimise eest
$('document').ready(function () {
//Kui search nupule vajutada, siis jookseb funktsioon
    $("#SearchButton").click(function () {
        //Kui aeg ei ole otsas, siis otsimise funktsioon töötab
        if (!window.otsas) {
            //tühjendab pakutud vastused ja eelmise pakkumise
            $("#pakutudVastused").empty();
            $("#displayData").empty();

            //ehitab searchTerminist urli, kuhu request saata
            var searchTermin = $("#searchTermin").val();
            searchTermin = searchTermin.split(/[ ]+/).join('_');
            var searchUrl = "https://restcountries.eu/rest/v2/name/" + searchTermin;

            console.log("Search url: " + searchUrl);
            var request = new XMLHttpRequest();




//kasutab GET-i, et avada uus request
            request.open("GET", searchUrl, true);


//Laeb JSONi siin
            request.onload = function () {


                // salvestab JSONi vastuse
                var data = JSON.parse(this.response);

                //kontrollib vastuse olemasolu ning kas sisendi pikkus üle 2 tähe
                if (searchTermin.length > 2) {
                    if (data[0] != undefined) {
                        testArray = data[0].hasOwnProperty("name");
                        console.log("Kas eksisteerib name type returnis: " + testArray)
                    } else {
                        testArray = false;
                    }
                }
                else {
                    testArray = false;
                    $("#displayData").append("<div id='response'><h3>Sisesta vähemalt 3 tähemärki</h3></div>");
                }

                //kui saadud vastuses on olemas, siis vaatab kas see vastus eksisteerib
                if (testArray) {
                    console.log("Kogu andme objekt: " + data);
                    console.log("Name type väärtus: " + data[0]["name"]);
                    $("#displayData").append("<div id='response'><h3>" + "Viimane pakutud vastus: " + searchTermin + "</h3><p></div>");

                    //Kui pakutud vastust ei ole varem pakutud
                    if ((pakutud.includes(data[0]["name"])) == false) {

                        pakutud.push(data[0]["name"])
                        pakutudPrint.push(" " + data[0]["name"])
                        console.log("Pakutud vastuste list: " + pakutud)
                        pakutudNr++;
                        //setib aja uuesti 30 sekundi peale
                        window.now = 0;
                        console.log(now)
                    }
                    //Kui vastust ei ole Annab teada, et riiki ei eksisteeri
                } else {
                    if (searchTermin.length > 2) {
                        console.log("Something went wrong"); //Kui sisendil puudub vastus, siis tagastab selle sõnumi
                        $("#displayData").append("<div id='response'><h3>Paku uus riik</h3></div>");
                    }
                }
                //Peale vastuse olemasolu kontrolli ja vaatamist, lisab pakutud vastuse pakutute listi
                $("#pakutudVastused").append("<div id='vastused'><h3>" + pakutudPrint + "</h3><p></div>");
                //Tühjendab inputi välja, et saaks uue riigi sisestada
                $("input:text").val("");
            };


//Saadab requesti
            request.send();
            //kuna otsimine toimus ja vastus leit

        }
    });

    //Kui vajutatakse enterit, siis võtab  seda kui hiire clickina ja jooksutab hiire clicki all olevat funktsiooni
    $("#searchTermin").keypress(function(e){
        //kui vajutatud nupp on enter
        if(e.which == 13){

            $("#SearchButton").click();
        }
    });
});

