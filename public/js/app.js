


const weatherForm = document.querySelector('form')
const selectInput = document.querySelector('input')
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()

    const location = selectInput.value 
    message1.textContent = 'loading...'
    message2.textContent = ''
    fetch('/weather?address=' + location).then((response) =>{
         
    response.json().then((data) =>{
        if(data.error){
            console.log(data.error)
            message1.textContent = data.error
        }else{
            console.log(data.location)
            console.log(data.forecast)
            message1.textContent = data.location
            message2.textContent = data.forecast
        }

    })
}) 
    console.log(location)
})