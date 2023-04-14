import React from 'react'

import { View, StyleSheet, Text, Image } from 'react-native'
import { DataTable, Card } from 'react-native-paper'

import { MaterialCommunityIcons } from '@expo/vector-icons'

function getLowTemp (forecast, dates) {
  let lowTemps = {}

  // console.log("forecast "+JSON.stringify(forecast)+" dates "+dates)

  if (dates !== undefined) {
    for (let index = 0; index < dates.length; index++) {
      let date = dates[index]
      lowTemps[date] = 1000
      let forecastList = forecast.list
      // console.log("forecast list is "+forecastList)

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

  // console.log("forecast "+JSON.stringify(forecast)+" dates "+dates)

  if (dates !== undefined) {
    for (let index = 0; index < dates.length; index++) {
      let date = dates[index]
      highTemps[date] = -100
      let forecastList = forecast.list
      // console.log("forecast list is "+forecastList)

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

// function getWeatherCondition (forecast, date) {
//   let iconsObject = []
//   let icon = ''
//   console.log('Condition :' + JSON.stringify(forecast.list))
//   if (dates !== undefined) {
//     for (let i = 0; i < dates.length; i++) {
//       let date = dates[i]
//       // iconsObject[date]= " "

//       for (let j = 0; j < forecast.list.length; j++) {
//         let condition = forecast.list[j].weather[0].icon
//         // weatherCondition[date]= condition
//         let currDate = forecast.list[j].dt_txt
//         currDate = currDate.split(' ')[0]
//         currDate = currDate.split('-')[1] + '/' + currDate.split('-')[2]

//         if (currDate === date) {
//           //   iconsObject.push(condition)
//           return `https://openweathermap.org/img/wn/${icon}@2x.png`
//           //   break
//           // weatherCondition[date]= condition
//         }
//       }
//     }
//   }

function getWeatherConditionIcon (forecast, date) {
  for (let j = 0; j < forecast.list.length; j++) {
    let condition = forecast.list[j].weather[0].icon
    // weatherCondition[date]= condition
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
  console.log('Dates Array: ' + datesArray)

  const lowTemp = getLowTemp(forecast, datesArray)
  const highTemp = getHighTemp(forecast, datesArray)


  return (
    <View style={styles.container}>
      <Card style={{ backgroundColor: 'white' }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title style={{marginLeft:20}}> Weather</DataTable.Title>
            <DataTable.Title numeric  style={{marginLeft:-20}}>Low</DataTable.Title>
            <DataTable.Title numeric style={{marginRight:10}}>High</DataTable.Title>
            {/* <DataTable.Title numeric>Humidity</DataTable.Title>  */}
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
    //   flex: 1,
    // flexDirection: "column",
    // width
  }
})
