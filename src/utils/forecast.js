const request = require('request')

const forecast = (longitude,latitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=e04f130a2d29ace71b5aad57a9439692&query=' + longitude + ',' + latitude + '&units=f'

    request({url, json: true}, (error, {body}) =>{

        if(error){
            callback('Unable to connect to forecast servers.', undefined)
        }else if(body.error){
            callback('Unable to provide weather forecast. Try another search. ', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. Humidity level is ' + body.current.humidity + '.')
        }
    })
}




module.exports = forecast