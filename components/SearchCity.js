// import React, { useState } from 'react'
// import { geoApiOptions, GEO_API_URL } from './CityApi'

// export default function SearchCity (inputValue) {
//   const url = `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=Hayward`
//   console.log('URL:' + url)

//   fetch(url, geoApiOptions)
//     .catch(err => {
//       console.log('error is ' + err)
//     })
//     .then(res => res.json())
//     .then(res => {
//       console.log('res is ' + JSON.stringify(res))
//       if (res.data.length == 0) {
//         console.log("returning empty")
//         return []
//       }
//       let data = res.data.map(city => {
//         return `${city.name}, ${city.country}`
//       })
//       console.log("returning "+data)

//       return data
//     })
// }
