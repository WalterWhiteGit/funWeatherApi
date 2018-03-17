//Attendre que l'arbre DOM soit construit, (hors essources externes <img> etc.. et les feuilles de style, sinon utiliser load).

document.addEventListener('DOMContentLoaded',(event)=>{

// Déclaration de nos variables issues du DOM    
let btn = document.querySelector("input[type='button']")
let result = document.querySelector('.weather')
let img = document.querySelector('.img')
let funImg = document.querySelector('.animate')

// Utlisation de l'objet.
const req = new XMLHttpRequest()

/*******************************
 Paramètres de recherche vers l'API :

Pour la température en Fahrenheit, utilisez les unités = imperial
Pour la température en Celsius, utilisez des unités = metric
***********************************/ 
let unit = "metric"
let ville = document.querySelector("#city")


// Fonction de requête vers l'API.
const showWeather = (city,temp)=>{
    funImg.src=""

    req.open('GET',`http://api.openweathermap.org/data/2.5/weather?q=${city},fr&units=${temp}&lang=fr&appid=yourtoken`,true)

// Tester le retour http    
    req.onreadystatechange = () =>{

        if ( req.readyState ===XMLHttpRequest.DONE && req.status ===404){

            let response  = JSON.parse(req.responseText)
            let errMsg = `${city} ne correspond à aucune ville de France`
            let error = "Une erreur est survenue"

            const err = (response.message === 'city not found') ? result.innerText=errMsg  : result.innerText = error 
        }

        else if(req.readyState === XMLHttpRequest.DONE && req.status === 200) {

            let response  = JSON.parse(req.responseText)

            let minTemp = response.main.temp_min

// Température actuel
            let maxTemp =response.main.temp_max

// Description du temps actuel
            let meteo = response.weather[0].description

// Id du temps
            let idMeteo = response.weather[0].id

// Id de l'icon météo            
            let icon = response.weather[0].icon

// Insertion de l'Id             
            let imgUrl = `http://openweathermap.org/img/w/${icon}.png`
            
            console.log(idMeteo)
            result.innerText =`${meteo} avec une température maximum de ${maxTemp}°` 
            img.src=imgUrl
            showImg(idMeteo)
        } 
    }
    req.send(null)
}


// Afficher image animée selon l'id météo.
const showImg = (id)=>{

    switch (id){

        case 800 :
            funImg.src= "img/homer_sun.gif"
        break ;

        case 601 ||615 || 616 :
            funImg.src = "img/homer_cold.gif"
        break;     
    }
}


// Ecoute du click.
btn.addEventListener('click',()=> showWeather(ville.value,unit))


})