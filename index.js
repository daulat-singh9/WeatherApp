
const input = document.getElementById("input")
const sbn = document.getElementById("sbtn")

const ACCESS_KEY = '445cd0743674ebb690533e571b497b89'

document.getElementById("input").addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        // Check if Enter key is pressed
        document.getElementById("sbtn").click();
        // Trigger button click
       sbtn.style.scale = "1.1";
    }
  });


async function fetchApi(val) {
    
    try{
        let responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${ACCESS_KEY}&units=metric`)
        let result = await responce.json()
        // console.log(result)
        if(result.message) {
            document.getElementById("info").innerHTML = `<h2>${val} ${result.message}</h2>`
        }

        displayWeather(result)
        
    }
    catch(err) {
        console.log(err.message)
    }
}

async function fetchCordinates(lati, longi) {
    
    try{
        let responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${ACCESS_KEY}&units=metric`)
        let result = await responce.json()
        // console.log(result)
        if(result.message) {
            document.getElementById("info").innerHTML = `<h2>${val} ${result.message}</h2>`
        }

        displayWeather(result)
        
    }
    catch(err) {
        console.log(err.message)
    }
}

document.getElementById("sbtn").addEventListener('click', () => {
    let city = input.value
    input.value = ''
    fetchApi(city)
})

function displayWeather(res) {
    // let km_h = Math.round((res.wind.speed*(18/5))*100)/100;

    document.getElementById("info").innerHTML =
        `       <div id="temp">
                    <p>${res.main.temp}°C</p>
                    <div id="icon">
                       <p>${res.weather[0].description}</p>
                       <img src='https://openweathermap.org/img/w/${res.weather[0].icon}.png'>
                    </div>
                </div>
                <div id="city">
                    <p>${res.name}</p>
                </div>

               <div id="wph">
                    <div id="wind">
                      <p>Wind</p>
                      <p>${res.wind.speed}km/h</p>
                    </div>

                    <div id="pressur">
                      <p>Pressur</p>
                      <p>${res.main.pressure}mb</p>
                    </div>

                    <div id="humidity">
                      <p>Humidity</p>
                      <p>${res.main.humidity}%</p>
                    </div>
               </div>`
    // document.getElementById("info").innerHTML = div
    
    document.getElementById("rfs").classList.add("visiblerfs")
}

document.getElementById("rfs").addEventListener('click', () => {
    document.getElementById("info").innerHTML = ''
    sbtn.style.scale = "1";
    document.getElementById("rfs").className = "hiddenrfs"
})


document.getElementById("location").addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        let lati = position.coords.latitude
        let longi = position.coords.longitude

        fetchCordinates(lati, longi)
    })
})