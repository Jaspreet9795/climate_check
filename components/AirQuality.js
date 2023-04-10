import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { TextInput, DataTable, Card, Avatar } from 'react-native-paper'

function getIconBasedOnPM25(pm25) {
    const goodIcon = props => <Avatar.Icon {...props} icon='emoticon-happy-outline' />
    const fairIcon = props => <Avatar.Icon {...props} icon='emoticon-neutral-outline' />
    const poorIcon = props => <Avatar.Icon {...props} icon='emoticon-sad-outline' />
    const veryPoorIcon = props => <Avatar.Icon {...props} icon='emoticon-cry-outline' />
    const extremelyPoorIcon = props => <Avatar.Icon {...props} icon='emoticon-sick-outline' />
    if(pm25 < 25) {
        return goodIcon;
    }
    if(pm25 < 50) {
        return fairIcon;
    }
    if(pm25 < 100) {
        return poorIcon;
    }
    if(pm25 < 300) {
        return veryPoorIcon;
    }
    return extremelyPoorIcon;
}

function getIconBasedOnPM10(pm10) {
    const goodIcon = props => <Avatar.Icon {...props} icon='emoticon-happy-outline' />
    const fairIcon = props => <Avatar.Icon {...props} icon='emoticon-neutral-outline' />
    const poorIcon = props => <Avatar.Icon {...props} icon='emoticon-sad-outline' />
    const veryPoorIcon = props => <Avatar.Icon {...props} icon='emoticon-cry-outline' />
    const extremelyPoorIcon = props => <Avatar.Icon {...props} icon='emoticon-sick-outline' />
    if(pm10 < 40) {
        return goodIcon;
    }
    if(pm10 < 80) {
        return fairIcon;
    }
    if(pm10 < 120) {
        return poorIcon;
    }
    if(pm10 < 300) {
        return veryPoorIcon;
    }
    return extremelyPoorIcon;
}

export default function AirQualityScreen ({route}) {
    console.log(" Route:" + JSON.stringify(route))
    const [airData, setAirData]= React.useState({})
    const [pm25, setpm25] = React.useState(0)
    const [pm10, setpm10] = React.useState(0)
    //  console.log("Lattitude in Air data :" + lat)
    useEffect(()=>{
        const url= `http://api.openweathermap.org/data/2.5/air_pollution?lat=${route.params.lat}&lon=${route.params.lon}&appid=${process.env.API_KEY}`
        fetch(url)
        .then(res=>res.json())
        .then(res=> {
            setAirData(res);
            console.log("Air data is : "+ JSON.stringify(airData));
        })
    },[])

    useEffect(()=>{
        if(airData.list !== undefined && airData.list[0] !== undefined && airData.list[0].components !== undefined) {
            setpm25(airData.list[0].components.pm2_5)
            setpm10(airData.list[0].components.pm10)
        }
    },[airData])


    const pm25Title = <Text>PM 2.5</Text>
    const pm25Text = <Text>{pm25}</Text>
    const pm10Title = <Text>PM 10</Text>
    const pm10Text = <Text>{pm10}</Text>
    const pm25ExplanationText = <Text>PM10 are very small particles found in dust and smoke. They have a diameter of 10 micrometres (0.01 mm) or smaller. PM10 particles are small enough to get into your throat and lungs. High levels of PM10 can make you cough, your nose run and eyes sting.</Text>
    const pm10ExplanationText = <Text>PM2.5 are very small particles usually found in smoke. They have a diameter of 2.5 micrometres (0.0025 mm) or smaller. Breathing in PM2.5 particles can affect your health. PM2.5 particles are small enough for you to breath them deeply into your lungs. Sometimes particles can enter your bloodstream.</Text>

  return (
    <View>
      <Card>
        <Card.Title
          title={pm25Title}
          subtitle={pm25Text}
          left={getIconBasedOnPM25(pm25)}
        ></Card.Title>
        <Card.Title
          title={pm10Title}
          subtitle={pm10Text}
          left={getIconBasedOnPM10(pm10)}
        ></Card.Title>
        {pm25ExplanationText}
        <Text>{"\n"}</Text>
        {pm10ExplanationText}
      </Card>
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
