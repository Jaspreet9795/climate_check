import React from 'react'

import { View, StyleSheet, Text } from 'react-native'
import { DataTable, Card } from 'react-native-paper'

// function getHighData (forecast) {
//     let res = { data: [] }
//     console.log('forecast in function is ' + JSON.stringify(forecast))
//     console.log('res before is ' + JSON.stringify(res))
    
//     if (forecast.list === undefined) {
//       return res
//     }
//     for (let index = 0; index < forecast.list.length; index++) {
//       console.log('forecast i ' + forecast.list)
//       const element = forecast.list[index]
//       res.data.push(element.main.temp)
//     }
//     // console.log('res is ' + res)
//     return res
//   }
  
function getLowTemp(forecast, dates){
    let lowTemps = {}
    
    console.log("forecast "+JSON.stringify(forecast)+" dates "+dates)

    if (dates !== undefined) {
        for (let index = 0; index < dates.length; index++) {
            let date = dates[index]
            lowTemps[date] = 1000
            let forecastList = forecast.list
            console.log("forecast list is "+forecastList)
    
            for (let j = 0; j < forecastList.length; j++) {
                let temp = forecastList[j].main.temp_min;
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

function getHighTemp(forecast, dates){
    let highTemps = {}
    
    // console.log("forecast "+JSON.stringify(forecast)+" dates "+dates)

    if (dates !== undefined) {
        for (let index = 0; index < dates.length; index++) {
            let date = dates[index]
            highTemps[date] = -100
            let forecastList = forecast.list
            console.log("forecast list is "+forecastList)
    
            for (let j = 0; j < forecastList.length; j++) {
                let temp = forecastList[j].main.temp_max;
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



  



export default function ForecastShow ({ forecast, datesArray }) {
  console.log('Forecast 5 day Data' + JSON.stringify(forecast))
  console.log("Dates Array: "+ datesArray)

  const lowTemp= getLowTemp(forecast, datesArray)
  const highTemp= getHighTemp(forecast, datesArray)

  return (
    <View style={styles.container}>
      <Card style={{ backgroundColor: 'white' }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title> 
            <DataTable.Title numeric>Low</DataTable.Title>
            <DataTable.Title numeric>High</DataTable.Title> 
            {/* <DataTable.Title numeric>Humidity</DataTable.Title>  */}
           </DataTable.Header>

           {datesArray && datesArray.map((date, index)=>{
          return (<DataTable.Row>
                <DataTable.Cell key={index} >{date}</DataTable.Cell>
               
            
            <DataTable.Cell numeric>{lowTemp[date]}</DataTable.Cell>
            <DataTable.Cell numeric>{highTemp[date]}</DataTable.Cell>

          </DataTable.Row>)
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
