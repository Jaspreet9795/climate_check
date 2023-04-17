import React, { useState, useEffect } from 'react'
import { View,  Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { Card} from 'react-native-paper'

import ForecastShow from './ForecastShow'

const screenWidth = Dimensions.get('window').width

function getHighData (forecast) {
  let res = { data: [] }

  if (forecast.list === undefined) {
    return res
  }
  for (let index = 0; index < forecast.list.length; index++) {
    const element = forecast.list[index]
    res.data.push(element.main.temp)
  }

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
    return Array.from(dates)
  }
}

export default function Forecast ({ route }) {
  const [forecast, setForecast] = useState({})
  const [loaded, setLoaded] = useState(false)

  const lat = route.params.lat
  const lon = route.params.lon
  const place = route.params.place

  const datesArray = getDate(forecast)
 


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
    <View style={{ flex: 1, backgroundColor: '#1A3850' }}>
      <Card
        style={{
          width: screenWidth,
          backgroundColor: 'white',
          marginBottom: 20,
          marginTop: 20
        }}
      >
        <Card.Title
          title={`${place} 5 Day Forecast`}
          style={{ marginLeft: 90 }}
        ></Card.Title>
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
              backgroundGradientFrom: '#E5E5E5',
              backgroundGradientTo: '#E5E5E5',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(26,56,80, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(26,56,80, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '3',
                strokeWidth: '1',
                stroke: '#9FC1DB'
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
        <ForecastShow
          forecast={forecast}
          datesArray={datesArray}
        ></ForecastShow>
      </View>
    </View>
  )
}
