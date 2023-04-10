import { React, useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Dimensions } from "react-native";
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

function getLabels(forecast) {
    let res = [new Date()];
    console.log("forecast in function is "+JSON.stringify(forecast))
    if(forecast === undefined) {
        return res;
    }
    for (let index = 0; index < forecast.list.length; index++) {
        const element = forecast.list[index];
        res.push(new Date(element.dt));
    }
    return res;
}

function getHighData(forecast) {
    let res = {data: []};
    console.log("forecast in function is "+JSON.stringify(forecast))
    console.log("res before is "+JSON.stringify(res));
    if(forecast === undefined) {
        return res;
    }
    for (let index = 0; index < forecast.list.length; index++) {
        console.log("forecast i "+forecast.list);
        const element = forecast.list[index];
        res.data.push(element.main.temp_max);
    }
    console.log('res is '+res)
    return res;
}

export default function Forecast ({ lat, lon }) {
  const [forecast, setForecast] = useState({})
  console.log('forecast lat ' + lat + ' lon ' + lon)

  useEffect(() => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.API_KEY}`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setForecast(res)
      })
      .then(console.log('forecast data ' + JSON.stringify(forecast)))
      .catch(err => console.log("error is "+err))
  }, [])

  useEffect(() => {
    console.log("forecast data2 is "+forecast);

  }, [forecast])

  return (
    <View>
      {/* <Text>{JSON.stringify(forecast)}</Text> */}
      <Text>LINE CHART</Text>

      <LineChart data={{labels: getLabels(forecast), datasets: [getHighData(forecast)]}}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        // yAxisLabel="Fahrenheit"
        yAxisSuffix=" F"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
    
       />

    </View>
  )
}
