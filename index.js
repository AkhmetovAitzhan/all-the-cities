const Pbf = require('pbf')
const fs = require('fs')
const path = require('path')

var pbf = new Pbf(fs.readFileSync(path.join(__dirname, 'cities.pbf')))
var cities = []

var lastLat = 0
var lastLon = 0
while (pbf.pos < pbf.length) {
    cities.push(pbf.readMessage(readCity, {
        id: '',
        name: '',
        country_code: '',
        country_name: '',
        location: {
            latitude: 0,
            longitude: 0,
        }
    }))
}

module.exports = cities

function readCity(tag, city, pbf) {
    if (tag === 1) city.id = pbf.readSVarint()
    else if (tag === 2) city.name = pbf.readString()
    else if (tag === 3) city.country_code = pbf.readString()
    else if (tag === 4) city.country_name = pbf.readString()
    else if (tag === 5) {
        lastLon += pbf.readSVarint()
        city.location.longitude = lastLon / 1e5
    } else if (tag === 6) {
        lastLat += pbf.readSVarint()
        city.location.latitude = lastLat / 1e5
    }
}
