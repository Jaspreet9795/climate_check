import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { DataTable, Card } from 'react-native-paper'

function getLowTemp (forecast, dates) {
  let lowTemps = {}
  if (dates !== undefined) {
    for (let index = 0; index < dates.length; index++) {
      let date = dates[index]
      lowTemps[date] = 1000
      let forecastList = forecast.list

      for (let j = 0; j < forecastList.length; j++) {
        let temp = forecastList[j].main.temp_min
        let currDate = forecastList[j].dt_txt
        currDate = currDate.split(' ')[0]
        currDate = currDate.split('-')[1] + '/' + currDate.split('-')[2]
        if (currDate === date && temp < lowTemps[currDate]) {
          lowTemps[currDate] = temp
        }
      }
    }
  }
  return lowTemps
}

function getHighTemp (forecast, dates) {
  let highTemps = {}
  if (dates !== undefined) {
    for (let index = 0; index < dates.length; index++) {
      let date = dates[index]
      highTemps[date] = -100
      let forecastList = forecast.list

      for (let j = 0; j < forecastList.length; j++) {
        let temp = forecastList[j].main.temp_max
        let currDate = forecastList[j].dt_txt
        currDate = currDate.split(' ')[0]
        currDate = currDate.split('-')[1] + '/' + currDate.split('-')[2]
        if (currDate === date && temp > highTemps[currDate]) {
          highTemps[currDate] = temp
        }
      }
    }
  }
  return highTemps
}


function getWeatherConditionIcon (forecast, date) {
  for (let j = 0; j < forecast.list.length; j++) {
    let condition = forecast.list[j].weather[0].icon
    let currDate = forecast.list[j].dt_txt
    currDate = currDate.split(' ')[0]
    currDate = currDate.split('-')[1] + '/' + currDate.split('-')[2]

    if (currDate === date) {
      return `https://openweathermap.org/img/wn/${condition}@2x.png`
    }
  }
}

export default function ForecastShow ({ forecast, datesArray }) {
  //   console.log('Forecast 5 day Data' + JSON.stringify(forecast))
//   console.log('Dates Array: ' + datesArray)

  const lowTemp = getLowTemp(forecast, datesArray)
  const highTemp = getHighTemp(forecast, datesArray)

  return (
    <View style={styles.container}>
      <Card style={{ backgroundColor: 'white' }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title style={{ marginLeft: 20 }}>
              {' '}
              Weather
            </DataTable.Title>
            <DataTable.Title numeric style={{ marginLeft: -20 }}>
              Low
            </DataTable.Title>
            <DataTable.Title numeric style={{ marginRight: 10 }}>
              High
            </DataTable.Title>
          </DataTable.Header>

          {datesArray &&
            datesArray.map((date, index) => {
              let icon = getWeatherConditionIcon(forecast, date)
              return (
                <DataTable.Row>
                  <DataTable.Cell key={index}>{date}</DataTable.Cell>

                  <DataTable.Cell numeric>
                    <Image
                      source={{ uri: icon }}
                      style={{ width: 70, height: 60 }}
                    ></Image>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{lowTemp[date]}</DataTable.Cell>
                  <DataTable.Cell numeric>{highTemp[date]}</DataTable.Cell>
                </DataTable.Row>
              )
            })}
        </DataTable>
      </Card>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
  }
})
