import React from 'react'
import { Button} from 'react-native-paper'
import CurrentWeather from './CurrentWeather'
import 'react-native-gesture-handler'
import { Text, StyleSheet, View, ImageBackground } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const cloudImg = require('../assets/cloudy.jpeg')
const sunnyImg = require('../assets/clear.jpeg')
const rainyImg = require('../assets/rainy.jpeg')
const hazeImg = require('../assets/Haze.jpeg')
const SnowImg = require('../assets/snow.jpeg')
const mistImg = require('../assets/mist.jpeg')
const smokeImg = require('../assets/smoke.jpeg')

export default function HomeScreen ({ navigation }) {
  const apiKey = process.env.API_KEY
  const [place, setPlace] = React.useState('Hayward')
  const [data, setData] = React.useState({})
  const [currTemp, setCurrTemp] = React.useState(0)
  const [low, setLow] = React.useState(0)
  const [high, setHigh] = React.useState(0)
  const [humidity, setHumidity] = React.useState(0)
  const [lat, setLat] = React.useState(37.6688)
  const [lon, setLon] = React.useState(-122.081)
  const [weatherCondition, setWeatherCondition] = React.useState([])
 

  React.useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=imperial&appid=${apiKey}`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setData(res)
        // console.log('data is ' + place + ' ' + JSON.stringify(data))
      })
      .catch(err => console.log(err))
  }, [place])

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
      console.log('Lattitude is :' + lat)
    }
    if (
      data !== undefined &&
      data.coord !== undefined &&
      data.coord.lon !== undefined
    ) {
      setLon(data.coord.lon)
      console.log('Long is :' + lon)
    }
    if (
      data !== undefined &&
      data.weather !== undefined &&
      data.weather[0] !== undefined
    ) {
      setWeatherCondition(data.weather[0].main)
      console.log('Weather is: ' + weatherCondition)
    }
  }, [data])

  function BackgroundImg (weatherCondition) {
    console.log('Checking Weather 4th:' + weatherCondition)
    if (weatherCondition === 'Clouds') {
      return cloudImg
    }
    if (weatherCondition === 'Clear') {
      return sunnyImg
    }
    if (weatherCondition === 'Haze') {
      return hazeImg
    }
    if (weatherCondition === 'Mist') {
      return mistImg
    }
    if (weatherCondition === 'Rain') {
      return rainyImg
    }
    if (weatherCondition === 'Smoke') {
      return smokeImg
    }
    if (weatherCondition === 'Snow') {
      return SnowImg
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={BackgroundImg(weatherCondition)}
        style={styles.image}
        resizeMode='cover'
      >
        <GooglePlacesAutocomplete
          styles={{
            textInput: {
              height: 55,
              color: '#5d5d5d',
              fontSize: 16,
              width: 7
            },
            textInputContainer: {
              flexDirection: 'row',
              width: 350,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 20
            },
            row: {
              backgroundColor: '#FFFFFF',
              padding: 13,
              height: 34,
              flexDirection: 'row',
              width: 350,
              marginLeft: 20,
              borderRadius: 6
            },
            poweredContainer: {
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
              borderColor: '#c8c7cc',
              borderTopWidth: 0.5,
              marginLeft: 20,
              marginRight: 20
            },
            separator: {
              height: 0.5,
              backgroundColor: '#c8c7cc',
              marginLeft: 20,
              marginRight: 20
            }
          }}
          placeholder='Search'
          fetchDetails={true}
          onPress={(data, details = null) => {
            setPlace(data.structured_formatting.main_text)
          }}
          query={{
            key: process.env.PLACES_API_KEY,
            language: 'en'
          }}
        />

        <CurrentWeather
          currTemp={currTemp}
          low={low}
          high={high}
          humidity={humidity}
          lat={lat}
          lon={lon}
          weatherCondition={weatherCondition}
          place={place}
        ></CurrentWeather>

        <View
          style={{ flexDirection: 'row', marginTop: -10, marginBottom: 40 }}
        >
          <Button
            style={{
              justifyContent: 'space-evenly',
              margin: 10,

              width: 150,
              marginLeft: 40
            }}
            mode='elevated'
            onPress={() =>
              navigation.navigate('Air Quality', {
                lat,
                lon
              })
            }
          >
            {' '}
            <Text>Air Quality</Text>{' '}
          </Button>

          <Button
            style={{
              justifyContent: 'space-evenly',
              margin: 10,

              width: 150
            }}
            mode='elevated'
            onPress={() =>
              navigation.navigate('Forecast', {
                lat,
                lon,
                place
              })
            }
          >
            <Text>Forecast</Text>
          </Button>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    height: 1000
  },
  button: {
    mode: 'elevated',
    color: 'gray'
  }
})
