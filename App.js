import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import AirQualityScreen from './components/AirQuality'
import Forecast from './components/forecast'
import HomeScreen from './components/HomeScreen'
// import Img from './components/Image'

const image = require('./assets/sunny.jpeg')

const Stack = createStackNavigator()

export default function App () {
  return (
    <SafeAreaProvider>
    <NavigationContainer >
      <Stack.Navigator
        // initialRouteName='Home'
        // screenOptions={{headerLeft : ()=><Img/>}}
      >
        <Stack.Screen
          style={{ flexDirection: 'row' }}
          name='WeatherFun'
          component={HomeScreen}
        ></Stack.Screen>
        <Stack.Screen
          name='Air Quality'
          component={AirQualityScreen}
        ></Stack.Screen>
        <Stack.Screen name='Forecast' component={Forecast}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  )
}
