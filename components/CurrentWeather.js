import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TextInput, DataTable, Card, Avatar } from 'react-native-paper'
import Forecast from './forecast'


export default function CurrentWeather ({ currTemp, high, low, humidity, lat, lon }) {
  const LeftContent = props => <Avatar.Icon {...props} icon='sun-thermometer' />
  const highTempIcon = props => (
    <Avatar.Icon {...props} icon='thermometer-high' />
  )
  const lowTempIcon = props => <Avatar.Icon {...props} icon='thermometer-low' />
  const humidityIcon = props => <Avatar.Icon {...props} icon='water-percent' />
  const title = <Text>Current Temperature</Text>
  const temp = <Text>{currTemp}</Text>
  const lowTitle = <Text>Low</Text>
  const lowText = <Text>{low}</Text>
  const highTitle = <Text>High</Text>
  const highText = <Text>{high}</Text>
  const humidityTitle = <Text>Humidity</Text>
  const humidityText = <Text>{humidity}</Text>
  return (
    <View>
      <Card>
        <Card.Title
          title={title}
          subtitle={temp}
          left={LeftContent}
        ></Card.Title>
      </Card>
      <Card>
        <Card.Title
          title={lowTitle}
          subtitle={lowText}
          left={lowTempIcon}
        ></Card.Title>
      </Card>
      <Card>
        <Card.Title
          title={highTitle}
          subtitle={highText}
          left={highTempIcon}
        ></Card.Title>
      </Card>
      <Card>
        <Card.Title
          title={humidityTitle}
          subtitle={humidityText}
          left={humidityIcon}
        ></Card.Title>
      </Card>
     {/* <Forecast /> */}
     {/* <Forecast lat={lat} lon={lon}></Forecast> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
