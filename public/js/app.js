const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const youSearched = document.querySelector('#you-searched')
const weFound = document.querySelector('#we-found')
const forecast = document.querySelector('#forecast')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    forecast.textContent = ""
    const location = search.value
    youSearched.textContent = "You searched: " + location
    weFound.textContent = "Loading..."

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
        
            if(data.error) {
                weFound.textContent = "Error: " + data.error
            } else {
                console.log(data)
                weFound.textContent = "We found: " + data.locationFound
                forecast.textContent = "Current weather: " + data.weatherResults.summary
            }
    })    

})
})