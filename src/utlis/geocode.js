const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHJpbWUxNzI5IiwiYSI6ImNraWtrcWxucTBhdGUyeXBrenk1aXZpNXcifQ.yh_H-IMllfjfQ6Z8kRGy9g&limit=1'
    request({ url, json : true},(error,{body})=>{
        if(error){
            callback('Unable to connect',undefined)
        }
        else if (body.features.length===0){
            callback('Unable to find location',undefined)
        }
        else{
            data = {
                longitude : body.features[0].center[1],
                lattitude : body.features[0].center[0],
                place : body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}

module.exports= geocode