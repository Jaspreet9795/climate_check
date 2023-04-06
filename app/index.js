import {
  View,
  Text,
  Image,
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
//   const [enteredPlace, setEnteredPlace]=useState('')
  console.log('PLACE :' + place)
  const [data, setData] = useState({})
  const apiKey = 'bafbd72ac926a526cdb494fcec5d4433'

  
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}`
    console.log('P' + place)
    fetch(url)
      .then(res => res.json())
    //   .then(res => console.log(res))
      .then(res => setData(res))
      .catch(err => console.log(err))
  }, [place])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'lightblue' }}>
      {/* <Text>Weather Data</Text> */}
      {/* <Image source={{uri: 'https://www.elephango.com/images/RCLG/12762-pollution-matters.jpg'}}
             style={{width: 400, height: 600}} /> */}

      <TextInput
        style={styles.input}
        //  onChangeText={(newvalue)=>setPlace(newvalue)}
        onSubmitEditing={value => setPlace(value.nativeEvent.text)}
        value={place}
      ></TextInput>
      <Text>Place: {place}</Text>

      {/* <Button buttonStyle={{ color:"red"}} title="Check Forecast"  ></Button> */}
      <Pressable style={styles.button} >
        <Text>Forecast</Text>
      </Pressable>

      <View style={styles.view}>
        <Text>1.{JSON.stringify(data)}</Text>
        <Text>2.</Text>
        <Text>3.</Text>
      </View>
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
    marginLeft: 50
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
  }
})
