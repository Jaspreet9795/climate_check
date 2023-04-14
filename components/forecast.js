import  React, {useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import {  Card, DataTable } from 'react-native-paper'

import ForecastShow from './ForecastShow'

const screenWidth = Dimensions.get('window').width

function getHighData (forecast) {
  let res = { data: [] }
  // console.log('forecast in function is ' + JSON.stringify(forecast))
  // console.log('res before is ' + JSON.stringify(res))
  
  if (forecast.list === undefined) {
    return res
  }
  for (let index = 0; index < forecast.list.length; index++) {
    // console.log('forecast i ' + forecast.list)
    const element = forecast.list[index]
    res.data.push(element.main.temp)
  }
  // console.log('res is ' + res)
  return res
}

function getDate (forecast) {
  let dates = new Set()
  if (forecast.list !== undefined) {
    for (let index = 0; index < forecast.list.length; index++) {
      const element = forecast.list[index]
      let date = element.dt_txt.split(' ')[0]
      date = date.split('-')[1] + '/' + date.split('-')[2]
      dates.add(date)
    }
    // console.log(' DATES ARE: ' + dates)
    return Array.from(dates)
  }
}



export default function Forecast ({ route }) {
  const [forecast, setForecast] = useState({})
  const [loaded, setLoaded] = useState(false)

  const [temp, setTemp] = useState(0)
  const [weatherState, setWeatherState] = useState(0)

  const lat = route.params.lat
  const lon = route.params.lon

  const datesArray= getDate(forecast)
  console.log("Dates Array 2: "+ datesArray)
 
  // const temperature = <Text>Temperature</Text>
  // const avgTemp = <Text>{temp}</Text>
  console.log('forecast lat ' + lat + ' lon ' + lon)

  useEffect(() => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.API_KEY}`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setForecast(res)
        setLoaded(true)
      })
      .then(console.log('forecast data ' + JSON.stringify(forecast)))
      .catch(err => console.log('error is ' + err))
  }, [])


  return (
    <View style={{flex:1, backgroundColor:"lightblue"}}>
      <Card style={{ width: screenWidth, backgroundColor:"white" , marginBottom:20, marginTop:20}}>
        <Card.Title  title='5 Day Temperature Review' style={{marginLeft:90}}></Card.Title>
        {loaded && (
          <LineChart
            data={{
              labels: getDate(forecast),
              datasets: [getHighData(forecast)]
            }}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisSuffix=' F'
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726'
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        )}
      </Card>
      <View>
      <ForecastShow forecast={forecast} datesArray={datesArray} ></ForecastShow>
      </View>
  
    </View>
  )
}
