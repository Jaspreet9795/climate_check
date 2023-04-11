import 'react-native-gesture-handler'
import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Button, Divider, Provider } from 'react-native-paper'
import { TextInput, DataTable, Card, Avatar } from 'react-native-paper'

// import CustomNavigationBar from './components/CustomNavigationBar'
import AirQualityScreen from './components/AirQuality'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/forecast'

const Stack = createStackNavigator()

function kelvinToFahrenheit (kelvinTemp) {
  // (T(°K) - 273.15) * 9 / 5 + 32;
  return kelvinTemp - (273.15 * 9) / 5 + 32
}

function HomeScreen ({ navigation }) {
  const apiKey = process.env.API_KEY
  const [place, setPlace] = React.useState('Hayward')
  const LeftContent = props => <Avatar.Icon {...props} icon='sun-thermometer' />
  const highTempIcon = props => (
    <Avatar.Icon {...props} icon='thermometer-high' />
  )
  const lowTempIcon = props => <Avatar.Icon {...props} icon='thermometer-low' />
  const humidityIcon = props => <Avatar.Icon {...props} icon='water-percent' />
  const [data, setData] = React.useState({})
  const [currTemp, setCurrTemp] = React.useState(0)
  const [low, setLow] = React.useState(0)
  const [high, setHigh] = React.useState(0)
  const [humidity, setHumidity] = React.useState(0)
  const [lat, setLat]= React.useState(37.6688)
  const [lon, setLon]= React.useState(-122.0810)
  const [weatherCondition, setWeatherCondition]= React.useState([])


  React.useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=imperial&appid=${apiKey}`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setData(res)
        console.log('data is ' + place + ' ' + JSON.stringify(data))
      })
      .catch(err => console.log(err))
  }, [place])

  console.log('Current data ' + place + ' ' + JSON.stringify(data))

  React.useEffect(() => {
    if (
      data !== undefined &&
      data.main !== undefined &&
      data.main.temp !== undefined
    ) {
      setCurrTemp(data.main.temp)
    }
    if (
      data !== undefined &&
      data.main !== undefined &&
      data.main.temp_min !== undefined
    ) {
      setLow(data.main.temp_min)
    }
    if (
      data !== undefined &&
      data.main !== undefined &&
      data.main.temp_max !== undefined
    ) {
      setHigh(data.main.temp_max)
    }
    if (
      data !== undefined &&
      data.main !== undefined &&
      data.main.humidity !== undefined
    ) {
      setHumidity(data.main.humidity)
    }
    if (
      data !== undefined &&
      data.coord !== undefined &&
      data.coord.lat !== undefined
    ) {
      setLat(data.coord.lat)
      console.log("Lattitude is :" + lat)
    }
    if (
      data !== undefined &&
      data.coord !== undefined &&
      data.coord.lon !== undefined
    ) {
      setLon(data.coord.lon)
      console.log("Long is :" + lon)
    }
    if (
      data !== undefined &&
      data.weather !== undefined &&
      data.weather[0] !== undefined
    ) {
      setWeatherCondition(data.weather[0].main)
      console.log("Weather is: " + weatherCondition)
    }
  }, [data])

   
  return (
    <ScrollView>
      <TextInput
        label='Place'
        value={place}
        onChangeText={place => setPlace(place)}
      />
      <CurrentWeather currTemp={currTemp} low={low} high={high} humidity={humidity} lat={lat} lon={lon} weatherCondition={weatherCondition}></CurrentWeather>
     
      <Button
      style={{justifyContent:"space-evenly", margin:10, overflow:"hidden"}}
        mode='contained'
        onPress={() => navigation.navigate('Air Quality', {
          lat,
          lon
        })}
      > <Text>Air Quality</Text> </Button> 
      
        <Button
        style={{justifyContent:"space-evenly" , margin:10, overflow:"hidden"}}
        mode='contained'
        onPress={() => navigation.navigate('Forecast', {
          lat,
          lon
        })}
      ><Text>Forecast</Text></Button>
    
      
    
    </ScrollView>
  )
}

export default function App () {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            // header: props => <CustomNavigationBar {...props} />
          }}
        >
          <Stack.Screen name='Home' component={HomeScreen}></Stack.Screen>
          <Stack.Screen
            name='Air Quality'
            component={AirQualityScreen}
          ></Stack.Screen>
          <Stack.Screen
            name='Forecast'
            component={Forecast}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
