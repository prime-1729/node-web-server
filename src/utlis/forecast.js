const request = require('request')

const forecast = (x,y,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=84715eab7ee71fb6d9887c48f429e2db&query='+x+','+y+'&units=f'
    request({url , json: true},(error,{body})=>{
        if (error){
            callback('Unable to connect',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            const data ={
                currentTemperature : body.current.temperature,
                feelslike : body.current.feelslike
            }
            callback(undefined,data)
        }
    })
}

module.exports = forecast