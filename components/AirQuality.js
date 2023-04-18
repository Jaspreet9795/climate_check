import React, { useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView
} from 'react-native'
import { DataTable, Card, Avatar, Modal, IconButton } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons'

const airImg = require('../assets/air.jpeg')

function getIconBasedOnPM25 (pm25) {
  const goodIcon = props => (
    <Avatar.Icon {...props} icon='emoticon-happy-outline' />
  )
  const fairIcon = props => (
    <Avatar.Icon {...props} icon='emoticon-neutral-outline' />
  )
  const poorIcon = props => (
    <Avatar.Icon {...props} icon='emoticon-sad-outline' />
  )
  const veryPoorIcon = props => (
    <Avatar.Icon {...props} icon='emoticon-cry-outline' />
  )
  const extremelyPoorIcon = props => (
    <Avatar.Icon {...props} icon='emoticon-sick-outline' />
  )
  if (pm25 < 25) {
    return goodIcon
  }
  if (pm25 < 50) {
    return fairIcon
  }
  if (pm25 < 100) {
    return poorIcon
  }
  if (pm25 < 300) {
    return veryPoorIcon
  }
  return extremelyPoorIcon
}

function getIconBasedOnPM10 (pm10) {
  const goodIcon = props => (
    <Avatar.Icon {...props} icon='emoticon-happy-outline' />
  )
  const fairIcon = props => (
    <Avatar.Icon {...props} icon='emoticon-neutral-outline' />
  )
  const poorIcon = props => (
    <Avatar.Icon {...props} icon='emoticon-sad-outline' />
  )
  const veryPoorIcon = props => (
    <Avatar.Icon {...props} icon='emoticon-cry-outline' />
  )
  const extremelyPoorIcon = props => (
    <Avatar.Icon {...props} icon='emoticon-sick-outline' />
  )
  if (pm10 < 40) {
    return goodIcon
  }
  if (pm10 < 80) {
    return fairIcon
  }
  if (pm10 < 120) {
    return poorIcon
  }
  if (pm10 < 300) {
    return veryPoorIcon
  }
  return extremelyPoorIcon
}

export default function AirQualityScreen ({ route }) {
  // console.log(' Route:' + JSON.stringify(route))
  const [airData, setAirData] = React.useState({})
  const [pm25, setpm25] = React.useState(0)
  const [pm10, setpm10] = React.useState(0)

  const [visible, setVisible] = React.useState(false)
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const containerStyle = { backgroundColor: 'white', padding: 20, margin: 10 }

  useEffect(() => {
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${route.params.lat}&lon=${route.params.lon}&appid=${process.env.API_KEY}`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setAirData(res)
      })
  }, [])

  useEffect(() => {
    if (
      airData.list !== undefined &&
      airData.list[0] !== undefined &&
      airData.list[0].components !== undefined
    ) {
      setpm25(airData.list[0].components.pm2_5)
      setpm10(airData.list[0].components.pm10)
    }
  }, [airData])

  const pm25Title = <Text>PM 2.5</Text>
  const pm25Text = <Text>{pm25}</Text>
  const pm10Title = <Text>PM 10</Text>
  const pm10Text = <Text>{pm10}</Text>
  const pm10ExplanationText = (
    <Text style={{ margin: 10, marginBottom: 0 }}>
      PM10 are very small particles found in dust and smoke. They have a
      diameter of 10 micrometres (0.01 mm) or smaller. PM10 particles are small
      enough to get into your throat and lungs. High levels of PM10 can make you
      cough, your nose run and eyes sting.
    </Text>
  )
  const pm25ExplanationText = (
    <Text style={{ margin: 10, marginTop: 0 }}>
      PM2.5 are very small particles usually found in smoke. They have a
      diameter of 2.5 micrometres (0.0025 mm) or smaller. Breathing in
      PM2.5 particles can affect your health. PM2.5 particles are small enough
      for you to breath them deeply into your lungs. Sometimes particles can
      enter your bloodstream.
    </Text>
  )

  return (
    <View style={styles.container}>
      <ImageBackground source={airImg} style={styles.image}>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={{
            zIndex: 1,
            position: 'absolute',
            marginTop: 500,
            margin: 20
          }}
          contentContainerStyle={containerStyle}
        >
          <ScrollView>
            <Text style={{ marginTop: 10 }}>{pm25ExplanationText}</Text>
            <Text>{'\n'}</Text>
            <Text>{pm10ExplanationText}</Text>
          </ScrollView>
        </Modal>

        <Card style={{ margin: 20, marginBottom: 5, backgroundColor: 'white' }}>
          <Card.Title
            title={pm25Title}
            subtitle={pm25Text}
            left={getIconBasedOnPM25(pm25)}
            right={props => (
              <Entypo
                name='info-with-circle'
                onPress={showModal}
                size={24}
                color='grey'
                style={{ margin: 10, marginTop: -5 }}
              />
            )}
          ></Card.Title>
          <Card.Title
            title={pm10Title}
            subtitle={pm10Text}
            left={getIconBasedOnPM10(pm10)}
          ></Card.Title>
        </Card>

        <Card style={{ margin: 20, backgroundColor: 'white' }}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Air Quality Level</DataTable.Title>
              <DataTable.Title>PM2.5 µg/m3</DataTable.Title>
              <DataTable.Title>PM10 µg/m3</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell>Good</DataTable.Cell>
              <DataTable.Cell>Less Than 25</DataTable.Cell>
              <DataTable.Cell>Less Than 40</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Fair</DataTable.Cell>
              <DataTable.Cell>25-50</DataTable.Cell>
              <DataTable.Cell>40-80</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Poor</DataTable.Cell>
              <DataTable.Cell>50-100</DataTable.Cell>
              <DataTable.Cell>80-120</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Very Poor</DataTable.Cell>
              <DataTable.Cell>100-300</DataTable.Cell>
              <DataTable.Cell>120-300</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Extremely Poor</DataTable.Cell>
              <DataTable.Cell>More than 300</DataTable.Cell>
              <DataTable.Cell>More than 300</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    margin: 10
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
  }
})
