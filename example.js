const cities = require('.')

console.log(cities.filter(city => {
  return city.name.match('Nur-Sultan')
}))
console.log(cities.length)

// [{
//     id: 65737,
//     name: 'Nur-Sultan',
//     country_code: 'KZ',
//     country_name: 'Kazakhstan',
//     location: { latitude: 71.44598, longitude: 51.1801 }
// }]
