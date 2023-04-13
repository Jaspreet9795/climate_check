import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// import { Provider } from 'react-native-paper'

import AirQualityScreen from './components/AirQuality'
import Forecast from './components/forecast'
import HomeScreen from './components/HomeScreen'
import Img from './components/Image'

const image= require('./assets/sunny.jpeg')


// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// const Tab = createBottomTabNavigator();


const Stack = createStackNavigator()



export default function App () {

  
  return (
    // <Provider>
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' 
      // screenOptions={{headerLeft : ()=><Img/>}}
      >
        <Stack.Screen name='Rainbow' component={HomeScreen}></Stack.Screen>
        <Stack.Screen
          name='Air Quality'
          component={AirQualityScreen}
        ></Stack.Screen>
        <Stack.Screen name='Forecast' component={Forecast}></Stack.Screen>
      </Stack.Navigator>

     
      
{/*       
      <Tab.Navigator>
        <Tab.Screen name='Home' component={HomeScreen}></Tab.Screen>
        <Tab.Screen name='Air Quality'component={AirQualityScreen}></Tab.Screen>
        <Tab.Screen name='Forecast' component={Forecast}></Tab.Screen>
      </Tab.Navigator> */}

 {/* <HomeScreen></HomeScreen> */}

    </NavigationContainer>
    // </Provider>
  )
}
