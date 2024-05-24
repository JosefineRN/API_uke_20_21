///////////// JavaScript for "click me!" button /////////////
const mybtn = document.getElementById('myList');
const tre = document.getElementById('btn');
tre.addEventListener("click", openmenu );
function openmenu() {
    if(mybtn.style.display != 'block') {
        mybtn.style.display = 'block';
    } else {
        mybtn.style.display = 'none';
    }
    console.log('clicked');
}

////////////////////////////////////////////////////////////








///////////// start kart innstilinger /////////////
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

var map = L.map('map1')
let marker = L.marker([59.745164250056135,10.164131070531106 ]).addTo(map)
let tileURL = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { }).addTo(map);
map.setView([59.745164250056135, 10.164131070531106], 15);
const tiles = L.tileLayer(tileURL,{attribution})

///////////// forklaring  /////////////

// linje 1: lager en ved navn "attribution" og lagrer en lenke til openstreetmap //
// linje 2: lager en variabel ved navn "map" og bruker den innebygde Leflet funksjonen for å lage et nytt kart som vil bli lagret i "map1" HTML-elementet //
// linje 3: lager en variabel ved navn "marker" og bruker den innebgygde Leaflet funksjonen for å lage en ny markør, skriver så inn latitude og longitude for hvor marløren skal plaseres og legger dette til kartet //
// linje 4: lager en variabel ved navn "TileURL" og bruker den innebygde Leaflet funksjonen for å lage nye lag til kartet og bruker openstreetmap som kilde, også legges dette til kartet/kart variabelen //
// linje 5: her "flytter" den kartet til kordinatene markøren er satt og zoomer så inn 15 //
// linje 6: lager en variabel ved navn "tiles" og bruker den innebygde Leaflet funksjonen for å lage nye lag og legger dette så til variabelen "tileURL" //

///////////////////////////////////








///////////// søkeknapp /////////////

const check_button = document.getElementById('mybtn');
check_button.addEventListener("click", show_me);

///////////// forklaring /////////////
// linje 1: lager en konstant variabel ved nvan "check_button" og henter HTML-elementet med ID "mybtn" og lagrer så dette i variabelen "check_button" //
// linje 2: legger til en "EventListner" som dokumenterer hva som skjer med dette elementet, når knappen klikkes vil funksjonen "show_me" kjøres //
////////////////////////////////////








///////////// asynk funksjon, show_me /////////////

async function show_me(){


    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        } else if (layer instanceof L.TileLayer) {
            map.removeLayer(layer);
        }
    })


    let place = document.getElementById("searchbar").value;
    let response = await fetch('https://api.openbrewerydb.org/v1/breweries?by_state'+place);
    let data = await response.json();
    console.log(data);


    
    let lat = data[0].latitude;
    let long = data[0].longitude;
    let options = {
        attribution: attribution
    };

  
    map.setView([lat, long]);
    let tileURL = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { }).addTo(map);
    data.forEach(element => {
        let marker = L.marker([element.latitude, element.longitude]).addTo(map);
        marker.bindPopup(`<b>${element.name}</b><br>${element.latitude}  ${element.longitude}`).openPopup();
    });
}

///////////// forklaring /////////////

// linje 1: lager en asynkron funksjon ved navn "show_me". En asynkron fuksjon betyr at hvis det er en oppgave i funksjonen //
// som kan ta litt tid å fullføre kan den kjøre mens de andre oppgavene etter kjøre samtidig, for å spare tid og trenger ikke vente
// til  informasjonen som den første oppgaven har hentet er sent tilbake //
// linje 2: her brukes "eachLayer" for å gå gjennom alle lagene i kartet //
// linje 3: her lages det in if-setning som sier at hvis laget er en mørker vil den...//
// linje 4: vil den fjene laget//
// linje 5: her lages en else-if setnign som sier at hvis laget er et "tile" lag vil det...//
// linje 6: vil koden fjerne dette laget. Med denne kode blokken vil koden fjerne alle lagene som ble lagret forrige gang brukeren søkte og gjøre sånn at brukeren kan søke flere ganger //
// linje 7: lager en variabel ved nvan "place" og henter HTML-elementet med ID "searchbar" og lagrer så dette i variabelen "place". "value" gjør at vi får verdien til inputen (det brukeren skriver) //
// linje 8: lager en variabel ved navn "response" og sier at den skal hente og sende (GET og POST) data fra openbrewerydb med "featch" funksjonen og plusse dette med "place"
// med "await" vil den vente/stoppe koden fra å kjøre vidre til den har fått dataen fra openbrewrydb, responsen //
// linje 9: lager en variabel ved navn "data" og sier at den skal gjøre om infomasjonen den har hentet fra openbrewerydb til et jason format. Med "await" så venter den med å kjøre resten av koden til den har gjort dette //
// linej 10: her printer den variabelen "data" til consolen //
// linje 11: lager en variabel ved navn "lat" og lagrer dataen om latitude til dokument 0 (1) //
// linje 12: lager en variabel ved navn "long" og lagrer dataen om longitude til dokument 0 (1) //
// linne 13: lager en vaiabel ved navn "options". I variabelen lages det et objekt ved hjelp av {}. Deretter lager den en "property" ved navn "attribution" og gir den variden "attribution"
// linje 14: med denne kode linjen setter vi "latitude" og "longitude" kordinatene i midten av kartet. Kartet beverger seg til dise kordinateen sånn at man ser hvor det er.
// linje 15: lager en variabel ved navn "TileURL" og bruker den innebygde Leaflet funksjonen for å lage nye lag til kartet og bruker openstreetmap som kilde, også legges dette til kartet/kart variabelen //
// linje 16: lager en slags for-løkke som gjør det følgene for alle dokumentene i jason filen vi hentet fra openbrewerydb //
// linje 17: lager en variabel ved navn "navn" marker, bruker en innebygd Leaflet funksjon som setter en markør iforhold til kordinatenen (logitude og latitude) i hvert dokument i jason filen og legger dette til kartet //
// linje 18: har lages det en popup, der navnet på bryggeriet skal stå i fet skrift, dereter skal det på netse linje stå kordinatene (latitude og longitude), så åpnes popupeen //

//////////////////////////////////////////////////








///////////// denne kosen vil ikke fungere /////////////
// koden jeg har forklart ovenfor vil ikke fungere, jeg har prøvd så mange ganger til å få den til å fungere //
// men den det går ikke. den fungerer noen ganger, men ikke andre. det føles helt tilfeldig //
// jeg skule gjerne kunne forklart hvorfor den ikke fungerer, men det kan jeg ikke // 
// koden gir deg et bryggeri (bryggeriet er plasert riktig og er det første i det store json dokumentet) //
// men ikke resten og det har ingenting å si hva du skriver i søke baren //
// koden min fungerte halveis, som sagt, på et tidspunkt, du fikk opp mange bryggerier og du ikke skrive inn stedet du ville se //
// men så fungerte det ikke lenger, som sgat jeg vet ikke hvorfor //
