import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'

function GetIcon ({ weatherCondition }) {
  console.log('Checking Weather: ' + weatherCondition)
  if (weatherCondition === 'Clouds') {
    return (
      <Image
        source={{ uri: 'https://openweathermap.org/img/wn/04d@2x.png' }}
        style={styles.image}
      ></Image>
    )
  }
  if (weatherCondition === 'Clear') {
    return (
      <MaterialCommunityIcons name='weather-sunny' size={120} color='yellow' />
    )
  }
  if (weatherCondition === 'Haze') {
    return (
      <Image
        source={{ uri: 'https://openweathermap.org/img/wn/50d@2x.png' }}
        style={styles.image}
      ></Image>
    )
  }
  if (weatherCondition === 'Mist') {
    return (
      <Image
        source={{ uri: 'https://openweathermap.org/img/wn/50d@2x.png' }}
        style={styles.image}
      ></Image>
    )
  }
  if (weatherCondition === 'Rain') {
    return (
      <Image
        source={{ uri: 'https://openweathermap.org/img/wn/10d@2x.png' }}
        style={styles.image}
      ></Image>
    )
  }
  if (weatherCondition === 'Smoke') {
    return (
      <Image
        source={{ uri: 'https://openweathermap.org/img/wn/50d@2x.png' }}
        style={styles.image}
      ></Image>
    )
  }
  if (weatherCondition === 'Snow') {
    return (
      <Image
        source={{ uri: 'https://openweathermap.org/img/wn/13d@2x.png' }}
        style={styles.image}
      ></Image>
    )
  }
}

function CurrentWeatherShow ({
  weatherCondition,
  place,
  currTemp,
  high,
  low,
  humidity
}) {
  console.log('Checking Weather 3rd: ' + weatherCondition)

  const searchedPlace = <Text>{place}</Text>
  const weatherText = <Text>{weatherCondition}</Text>
  const temp = <Text>{currTemp}</Text>
  const lowTemp = <Text>{low}</Text>
  const highTemp = <Text>{high}</Text>
  const humidityText = <Text>{humidity}</Text>

  return (
    <View style={styles.currentWeatherContainer}>
      <Text
        style={{
          margin: 30,
          marginBottom: 10,
          fontSize: 30,
          fontWeight: 'bold'
        }}
      >
        {searchedPlace}
      </Text>
      <View style={{ margin: 5 }}>
        <GetIcon weatherCondition={weatherCondition}></GetIcon>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <MaterialCommunityIcons
          name='weather-cloudy-clock'
          size={24}
          color='black'
          style={{ marginRight: 10, paddingTop: 30 }}
        />
        <Text
          style={{
            fontSize: 18,
            paddingBottom: 10,
            paddingTop: 30,
            fontWeight: 'bold'
          }}
        >
          Weather Condition - {weatherText}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <MaterialCommunityIcons
          name='temperature-fahrenheit'
          size={24}
          color='black'
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontSize: 18, paddingBottom: 10, fontWeight: 'bold' }}>
          Current Temp - {temp}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <FontAwesome5
          name='temperature-high'
          size={20}
          color='black'
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontSize: 18, paddingBottom: 10, fontWeight: 'bold' }}>
          Temp High - {highTemp}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <FontAwesome5
          name='temperature-low'
          size={20}
          color='black'
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontSize: 18, paddingBottom: 10, fontWeight: 'bold' }}>
          Temp Low - {lowTemp}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <MaterialCommunityIcons name='water-percent' size={24} color='black' />
        <Text style={{ fontSize: 18, paddingBottom: 10, fontWeight: 'bold' }}>
          Humidity - {humidityText}
        </Text>
      </View>
    </View>
  )
}

export default function CurrentWeather ({
  currTemp,
  high,
  low,
  humidity,
  weatherCondition,
  place
}) {
  console.log('Checking Weather 2nd: ' + weatherCondition)

  return (
    <View style={{ marginTop: 10 }}>
      <CurrentWeatherShow
        weatherCondition={weatherCondition}
        place={place}
        currTemp={currTemp}
        low={low}
        high={high}
        humidity={humidity}
      ></CurrentWeatherShow>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 150,
    height: 150
  },
  currentWeatherContainer: {
    backgroundColor: '#00000044',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: '#eee',
    borderWidth: 1,
    height: 450,
    margin: 30
  }
})
