import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Button} from 'react-native'
import { TextInput, DataTable, Card, Avatar } from 'react-native-paper'
import Forecast from './forecast'
import { MaterialCommunityIcons } from '@expo/vector-icons';





// function getWeatherImg (weatherCondition) {
//   if (weatherCondition === 'Clouds') {
//     return (
//       <Card.Cover
//         source={{
//           uri: 'https://www.wkbn.com/wp-content/uploads/sites/48/2022/07/clouds-cloudy-sky-spring-summer-fall-winter-weather-generic-8.jpg?w=1280'
//         }}
//       ></Card.Cover>
//     )
//   }
//   if (weatherCondition === 'Haze') {
//     return (
//       <Card.Cover
//         source={{
//           uri: 'https://www.sltrib.com/resizer/ASWajk9i9mv4f_2zplT4fpsLz3A=/arc-anglerfish-arc2-prod-sltrib/public/FOO4BQCLHJF2LIRMQEER7TRVNM.jpg'
//         }}
//       ></Card.Cover>
//     )
//   }
//   if (weatherCondition === 'Clear') {
//     return (
//       <Card.Cover
//         source={{
//           uri: 'https://www.vmcdn.ca/f/files/sudbury/uploadedImages/SUMMER_sunWater.jpg;w=960'
//         }}
//       ></Card.Cover>
//     )
//   }
//   if (weatherCondition === 'Rain') {
//     return (
//       <Card.Cover
//         source={{
//           uri: 'https://d3nw4j4l7g05ee.cloudfront.net/wp-content/uploads/2019/12/rain-in-city-350x233.jpeg'
//         }}
//       ></Card.Cover>
//     )
//   }
//   if (weatherCondition === 'Snow') {
//     return (
//       <Card.Cover
//         source={{
//           uri: 'https://www.vmcdn.ca/f/files/via/images/weather/vancouver-weather-forecast-december-2021-snowfall.jpg;w=960'
//         }}
//       ></Card.Cover>
//     )
//   }
//   if (weatherCondition === 'Smoke') {
//     return (
//       <Card.Cover
//         source={{
//           uri: 'https://s3.amazonaws.com/wxlongform/featuresms/wp-content/uploads/2020/09/06-Wildfire-smoke-Seattle-20200911-1-scaled.jpg'
//         }}
//       ></Card.Cover>
//     )
//   }
//   if (weatherCondition === 'Mist') {
//     return (
//       <Card.Cover
//         source={{
//           uri: 'https://www.weather.gov/images/safety/fog_NOAA_mountain.png'
//         }}
//       ></Card.Cover>
//     )
//   }
// }

function GetIcon({weatherCondition}){
console.log("Checking Weather: "+(weatherCondition))
  if (weatherCondition === 'Clouds') {
        return (
          <Image source= {{uri: "https://openweathermap.org/img/wn/04d@2x.png"}} style={styles.image}></Image>
        )
      }
  if (weatherCondition === 'Clear') {
        return (
          <Image source= {{uri: "https://openweathermap.org/img/wn/01d@2x.png"}} style={styles.image}></Image>
        )
      }
  if (weatherCondition === 'Haze') {
        return (
          <Image source= {{uri: "https://openweathermap.org/img/wn/50d@2x.png"}} style={styles.image}></Image>
        )
    }
  if (weatherCondition === 'Mist') {
      return (
        <Image source= {{uri: "https://openweathermap.org/img/wn/50d@2x.png"}} style={styles.image}></Image>
      )
    }
  if (weatherCondition === 'Rain') {
      return (
        <Image source= {{uri: "https://openweathermap.org/img/wn/10d@2x.png"}} style={styles.image}></Image>
      )
    }
  if (weatherCondition === 'Smoke') {
      return (
        <Image source= {{uri: "https://openweathermap.org/img/wn/50d@2x.png"}} style={styles.image}></Image>
      )
    }
  if (weatherCondition === 'Snow') {
      return (
        <Image source= {{uri: "https://openweathermap.org/img/wn/13d@2x.png"}} style={styles.image}></Image>
      )
    }

}

function CurrentWeatherShow({weatherCondition, place,currTemp, high,low, humidity, }){
  console.log("Checking Weather 3rd: "+(weatherCondition))

  const searchedPlace=<Text>{place}</Text>
  const weather = <Text>Weather Condition</Text>
  const weatherText = <Text>{weatherCondition}</Text>
  const title = <Text>Current Temperature</Text>
  const temp = <Text>{currTemp}</Text>
  const lowTitle = <Text>Low</Text>
  const lowText = <Text>{low}</Text>
  const highTitle = <Text>High</Text>
  const highText = <Text>{high}</Text>
  const humidityTitle = <Text>Humidity</Text>
  const humidityText = <Text>{humidity}</Text>
 

  return (
    <View style={styles.currentWeatherContainer}>
      <Text style ={{margin:30,marginBottom:10, fontSize:30}}>{searchedPlace}</Text>
      <View style={{margin:5}}>
      <GetIcon weatherCondition={weatherCondition}></GetIcon>
      </View>
    
     <View style={{flexDirection:"row"}} >
   
      <MaterialCommunityIcons name="weather-cloudy-clock" size={24} color="black" />
      <Text style={{fontSize:20}}>Weather Condition - {weatherText}</Text>
      </View>
      <View style={{flexDirection:"row"}} >
   
      <MaterialCommunityIcons name="temperature-fahrenheit" size={24} color="black" />
      <Text style={{fontSize:20}}>Weather Condition - {weatherText}</Text>
      </View>



      <View>
      <Text>{title}</Text>
      <Text>{temp}</Text>
      </View>
      <Text>Night - 789</Text>
      <Text>Day - 789</Text>
     </View>
     

  )
}





export default function CurrentWeather ({
  currTemp,
  high,
  low,
  humidity,
  weatherCondition, place
}) {
  const weatherIcon = props => (
    <Avatar.Icon {...props} icon='weather-cloudy-clock' />
  )
  const LeftContent = props => <Avatar.Icon {...props} icon='sun-thermometer' />
  const highTempIcon = props => (
    <Avatar.Icon {...props} icon='thermometer-high' />
  )
  const lowTempIcon = props => <Avatar.Icon {...props} icon='thermometer-low' />
  const humidityIcon = props => <Avatar.Icon {...props} icon='water-percent' />

  // const weather = <Text>Weather Condition</Text>
  // const weatherText = <Text>{weatherCondition}</Text>
  // const title = <Text>Current Temperature</Text>
  // const temp = <Text>{currTemp}</Text>
  // const lowTitle = <Text>Low</Text>
  // const lowText = <Text>{low}</Text>
  // const highTitle = <Text>High</Text>
  // const highText = <Text>{high}</Text>
  // const humidityTitle = <Text>Humidity</Text>
  // const humidityText = <Text>{humidity}</Text>

  


  console.log("Checking Weather 2nd: "+weatherCondition)

  return (
    <View style={{ marginTop: 10 }}>
     
      {/* <Card>
        {getWeatherImg(weatherCondition)}
        <Card.Title
          title={weather}
          subtitle={weatherText}
          left={weatherIcon}
        ></Card.Title>
        <Card.Title
          title={title}
          subtitle={temp}
          left={LeftContent}
        ></Card.Title>
        <Card.Title
          title={lowTitle}
          subtitle={lowText}
          left={lowTempIcon}
        ></Card.Title>
        <Card.Title
          title={highTitle}
          subtitle={highText}
          left={highTempIcon}
        ></Card.Title>
        <Card.Title
          title={humidityTitle}
          subtitle={humidityText}
          left={humidityIcon}
        ></Card.Title>
      </Card> */}


      <CurrentWeatherShow weatherCondition={weatherCondition} place={place} currTemp={currTemp} low={low} high={high} humidity={humidity}></CurrentWeatherShow>





    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  image:{
    width:150,
    height:150
  }, 
  currentWeatherContainer: {
    // flexDirection: 'row',
    backgroundColor: '#00000033',
    // justifyContent:"center",
    alignItems:'center',
    borderRadius: 15,
    borderColor:'#eee',
    borderWidth:1,
    height:450, 
    margin:30
},
})
