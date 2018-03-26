//Attendre que l'arbre DOM soit construit, (hors essources externes <img> etc.. et les feuilles de style, sinon utiliser load).

document.addEventListener('DOMContentLoaded',(event)=>{

// Déclaration de nos variables issues du DOM    
let btn = document.querySelector("input[type='button']")
let result = document.querySelector('.weather')
let img = document.querySelector('.img')
let funImg = document.querySelector('.fig')
let displayRes = document.querySelector('.return')
let errMsg = document.querySelector('.error')


// Utlisation de l'objet.
const req = new XMLHttpRequest()

/*******************************
 Paramètres de recherche vers l'API :

Pour la température en Fahrenheit, utilisez les unités = imperial
Pour la température en Celsius, utilisez des unités = metric
***********************************/ 
let unit = "metric"
let ville = document.querySelector("#city")

/*******************************
 Fonction de requête vers l'API.
*******************************/

// Vériier le champ 
const checkBtn = ()=> ville.value != ""  ? showWeather(ville.value,unit) : errMsg.textContent='Veuillez saisir une ville'

// Appel vers l'API si champ rempli
const showWeather = (city,temp)=>{


    req.open('GET',`https://api.openweathermap.org/data/2.5/weather?q=${city},fr&units=${temp}&lang=fr&appid=0acd37018790aafd9883a9cb3709adb3`,true)

// Tester le retour http    
    req.onreadystatechange = () =>{

        if ( req.readyState ===XMLHttpRequest.DONE && req.status ===404){

            let obj  = JSON.parse(req.responseText)
            let errMsg = `${city} ne correspond à aucune ville de France`
            let error = "Une erreur est survenue"

            const err = (obj.message === 'city not found') ? result.innerText=errMsg  : result.innerText = error 
        }

        else if(req.readyState === XMLHttpRequest.DONE && req.status === 200) {
            errMsg.textContent=""
            let obj  = JSON.parse(req.responseText)

            let minTemp = obj.main.temp_min

// Température actuel
            let maxTemp =obj.main.temp_max

// Description du temps actuel
            let meteo = obj.weather[0].description

// Id du temps
            let idMeteo = obj.weather[0].id

// Id de l'icon météo            
            let icon = obj.weather[0].icon

// Insertion de l'Id             
            let imgUrl = `http://openweathermap.org/img/w/${icon}.png`
            
            result.innerText =`${meteo} avec une température maximum de ${maxTemp}°`.toUpperCase()
            img.src=imgUrl
            showImg(idMeteo)
            displayRes.style.display="block"

        } 
    }
    req.send(null)
}

/*******************************
CONDITIONS SELON L'Id METEO
*******************************/
const showImg = (id)=> id >=500 && id <= 532 ? funImg.src="img/rain.gif" : imgCold(id)
const imgCold = (id)=> id >=600 && id <= 622 ? funImg.src="img/snow.gif" : imgSun(id)
const imgSun  = (id)=> id === 800 || id === 801 ? funImg.src="img/sun.gif" : imgCloud(id)
const imgCloud = (id)=> id >801 && id < 805 ? funImg.src="img/cloud.gif" : ""


// Ecoute du click.
btn.addEventListener('click',()=> checkBtn())

})

    








