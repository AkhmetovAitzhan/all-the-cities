#!/usr/bin/env node

const Pbf = require('pbf')

const citiesJSON = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json';

const pbf = new Pbf()

let lastLat = 0
let lastLon = 0

function writeCity(city, pbf) {
    pbf.writeSVarintField(1, city.id)
    pbf.writeStringField(2, city.name)
    pbf.writeStringField(3, city.country_code)
    pbf.writeStringField(4, city.country_name)

    const lat = Math.round(1e5 * Number(city.latitude))
    const lon = Math.round(1e5 * Number(city.longitude))
    pbf.writeSVarintField(5, lon - lastLon)
    pbf.writeSVarintField(6, lat - lastLat)


    lastLat = lat
    lastLon = lon
}

async function build() {
    try {
        const cities = await fetch(citiesJSON)
            .then(response => response.json());

        cities.forEach(city => {
            pbf.writeRawMessage(writeCity, city);
        })

        process.stdout.write(Buffer.from(pbf.finish()))
    } catch (e) {
        console.log(e);
    }
}

build();
