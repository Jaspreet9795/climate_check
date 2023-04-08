import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  Pressable
} from 'react-native'

import { useState, React, useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'

export default function Home () {
  const router = useRouter()
  const [place, setPlace] = useState('')
  const [enteredPlace, setEnteredPlace] = useState('')
  console.log('PLACE :' + place)
  const [data, setData] = useState({})
  console.log('DATA Check:' + JSON.stringify(data))
  const apiKey = process.env.API_KEY

  const handleClick = () => {
    // alert('Forecast is here!')
    setPlace()
  }
  console.log("Testing: " + process.env.TEST) 

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${enteredPlace},units=imperial&appid=${apiKey}`
    console.log('P' + place)
    fetch(url)
      .then(res => res.json())
      //       .then(res => {console.log(res)
      //     //   setData(res)
      //   })
      .then(res => setData(res))
      //   .then(res => console.log('Response 2: ' + JSON.stringify(res)))
      //   .then(console.log('DATA : ' + (data)))
      .catch(err => console.log(err))
  }, [enteredPlace])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'lightblue' }}>
      <ImageBackground
        source={{
          uri: 'https://a-static.besthdwallpaper.com/ocean-waves-hitting-the-beach-in-clear-cloudy-weather-wallpaper-2560x1600-105781_7.jpg'
        }}
        style={{ width: 400, height: 900 }}
      >
        {/* https://images.nationalgeographic.org/image/upload/t_edhub_resource_related_resources/v1607613327/videos/posters/Climate%20101:%20Cause%20%20Effect.jpg */}
        <TextInput
          style={styles.input}
          onChangeText={newvalue => setPlace(newvalue)}
        //   onSubmitEditing={value => setPlace(value.nativeEvent.text)}
          defaultValue={place}
        ></TextInput>
        {/* <Text>Place: {place}</Text> */}

        <Button
          title='Check Forecast'
          onPress={() => setEnteredPlace(place)}
        ></Button>
        {/* <Pressable style={styles.button} >
        <Text>Forecast</Text>
      </Pressable> */}
      

        <View style={styles.view}>
          {/* <Text style={styles.text}> Humidity          {JSON.stringify(data.main.humidity)}</Text>
          <Text style={styles.text}> Temperature       {JSON.stringify(data.main.temp)} </Text> */}
          <Text></Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  view: {
    height: 400,
    width: 300,
    borderWidth: 3,
    borderColor: 'gray',
    margin: 30,
    marginLeft: 50,
    borderRadius: 20,
    padding: 30, 
    // display: 'flex',
    // alignItems:'flex-end'
    // flexDirection: 'row',
    // alignSelf: 'stretch',
    // justifyContent: "space-between"
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 2,
    width: 100,
    marginLeft: 150,
    borderRadius: 1,
    elevation: 1,
    backgroundColor: 'grey'
  }, 
  text: {
    fontSize: 20, 
    fontWeight: 'bold',
    alignSelf:'stretch', 
    // flexDirection:'row'
    // textAlign:'justify'
  }

})
