let allCities = []
var today = []
let cities = document.getElementById("cities") 
let image = document.getElementById("image") 
let city= document.getElementById("city") 
const weekDiv = document.getElementById("AllDays");
const dateNow = document.getElementById('dateNow');
const heure = document.getElementById('heure');
const temperature = document.getElementById('temperature');
const longitude = document.getElementById('longitude');
const latitude = document.getElementById('latitude');
window.onload = () => {
  allCities = [
    // Villes camerounaises
    { name: "Yaoundé", lat: 3.8480, lon: 11.5021 },
    { name: "Douala", lat: 4.0511, lon: 9.7085 },
    { name: "Bafoussam", lat: 5.4643, lon: 10.1542 },
    { name: "Bertoua", lat: 4.5833, lon: 13.6833 },
    { name: "Garoua", lat: 9.3167, lon: 13.4000 },
    { name: "Maroua", lat: 10.5939, lon: 14.3197 },
    { name: "Ngaoundéré", lat: 7.3206, lon: 13.5894 },
    { name: "Kousséri", lat: 12.5061, lon: 14.3294 },
    { name: "Buea", lat: 4.1500, lon: 9.3000 },
    { name: "Limbe", lat: 4.0224, lon: 9.2195 },
    { name: "Kribi", lat: 4.5569, lon: 9.9294 },
    { name: "Ebolowa", lat: 3.0667, lon: 11.5167 },
    { name: "Nkongsamba", lat: 4.9500, lon: 9.9500 },
    { name: "Foumban", lat: 5.7131, lon: 10.9903 },
    { name: "Dschang", lat: 5.4542, lon: 10.0917 },

    // Villes françaises
    { name: "Paris", lat: 48.8566, lon: 2.3522 },
    { name: "Marseille", lat: 43.2965, lon: 5.3698 },
    { name: "Lyon", lat: 45.7640, lon: 4.8357 },
    { name: "Toulouse", lat: 43.6047, lon: 1.4442 },
    { name: "Nice", lat: 43.7102, lon: 7.2620 },
    { name: "Nantes", lat: 47.2184, lon: -1.5536 },
    { name: "Strasbourg", lat: 48.5734, lon: 7.7521 },
    { name: "Montpellier", lat: 43.6117, lon: 3.8767 },
    { name: "Bordeaux", lat: 44.8378, lon: -0.5792 },
    { name: "Lille", lat: 50.6292, lon: 3.0573 },

    // Villes américaines
    { name: "New York", lat: 40.7128, lon: -74.0060 },
    { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
    { name: "Chicago", lat: 41.8781, lon: -87.6298 },
    { name: "Houston", lat: 29.7604, lon: -95.3698 },
    { name: "Miami", lat: 25.7617, lon: -80.1918 },
    { name: "San Francisco", lat: 37.7749, lon: -122.4194 },
    { name: "Las Vegas", lat: 36.1699, lon: -115.1398 },
    { name: "Dallas", lat: 32.7767, lon: -96.7970 },
    { name: "Washington D.C.", lat: 38.9072, lon: -77.0369 },
    { name: "Atlanta", lat: 33.7490, lon: -84.3880 },

    // Villes asiatiques
    { name: "Beijing", lat: 39.9042, lon: 116.4074 },
    { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
    { name: "Delhi", lat: 28.6139, lon: 77.2090 },
    { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
    { name: "Seoul", lat: 37.5665, lon: 126.9780 },
    { name: "Bangkok", lat: 13.7563, lon: 100.5018 },
    { name: "Jakarta", lat: -6.2088, lon: 106.8456 },
    { name: "Kuala Lumpur", lat: 3.1390, lon: 101.6869 },
    { name: "Singapore", lat: 1.3521, lon: 103.8198 },
    { name: "Manila", lat: 14.5995, lon: 120.9842 }
  ];

  // Vérification du nombre de villes ajoutées
  console.log(allCities.length);

  allCities.forEach(city => {
    const option = document.createElement('option');
    option.value = `${city.lat},${city.lon},${city.name}`;  
    option.textContent = city.name;  
    cities.appendChild(option); 
  });
}
cities.addEventListener('change', (event) => {
    let results =null
    const [lat, lon, name] = event.target.value.split(",");
    console.log(event.target.value) // Sépare latitude et longitude
    const url = `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`;

    fetch(url)
      .then(response => response.json()) 
      .then(data => {
          console.log(data); 
           results = data.dataseries
           const testDiv = document.getElementById("acceuil");
    const affichageDivs = document.querySelectorAll(".affichage");

    if (testDiv) testDiv.classList.replace("flex", "hidden");

    affichageDivs.forEach(div => {
      div.classList.replace("hidden", "flex");
    });
    // Récupérer la div contenant la classe "week"


// Vérifier si la div existe
if (weekDiv) {
    weekDiv.innerHTML = ""
    // Ajouter 7 nouveaux éléments à l'intérieur
    results.forEach((element , index) => {
       
        let date = element.date
        const formattedDate = new Date(date.toString().slice(0, 4), date.toString().slice(4, 6) - 1, date.toString().slice(6, 8));
        let weather = ""
        switch (element.weather) {
            case 'sunny':
                weather =  '☀️'; // Icône du soleil
            case 'cloudy':
                weather =  '☁️'; // Icône des nuages
            case 'rain':
                weather = '🌧️'; // Icône de la pluie
            case 'snow':
                weather = '❄️'; // Icône de la neige
            case 'storm':
                weather = '🌩️'; // Icône de l'orage
            default:
                weather = '🌤️'; // Icône par défaut pour temps incertain
        }

// Obtenir le jour de la semaine en anglais
const options = { weekday: 'long' }; // 'long' pour avoir le nom complet du jour
const dayOfWeek = formattedDate.toLocaleDateString('en-US', options);

console.log(dayOfWeek);
        
        weekDiv.innerHTML += `  <div class="bg-white ml-4 px-4 rounded-lg w-[98%] lg:w-[14%] h-60" >
        <p class="text-center">${dayOfWeek}</p>
        <div class="w-full h-[60%] flex justify-center items-center">
        <p class="text-center text-[50px]">${weather}</p>
        </div>
        <div>
            <p class="font-extralight text-center">H :${element.temp2m.max}&deg</p>
            <p class="font-extralight text-center">L:${element.temp2m.min}&deg</p>
        </div>

    </div>`;  
    if(index ==1){
        today = element
        // Date donnée : 20250221
const dateString = '20250221';

const year = dateString.substring(0, 4);
const month = dateString.substring(4, 6);
const day = dateString.substring(6, 8);

const date = new Date(`${year}-${month}-${day}`);

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formattedDate = `${day} ${months[parseInt(month) - 1]} ${year}`;

dateNow.innerHTML = formattedDate


const currentTime = new Date();

let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();


const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12; 
minutes = minutes < 10 ? '0' + minutes : minutes; 

const formattedTime = `${hours}:${minutes} ${ampm}`;

heure.innerHTML = formattedTime
latitude.innerHTML = "latitude " +lat+"&deg" 
longitude.innerHTML ="longitude " + lon+"&deg" 
city.innerHTML = name
image.innerHTML = weather
temperature.innerHTML = element.temp2m.max+"&deg" 

    }
    }); 
       
    
}

      })
      .catch(error => {
          console.error("Erreur lors de la récupération des données :", error);
      });
});
