import React from "react";

import {View, Image} from 'react-native';

export default function Img(){
    return (
        <View style={{flexDirection: 'row'}}>
          <Image
        
          source={item.image}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40 / 2,
              marginLeft: 120,
            }}
          />
        </View>
      );
    
}
const item ={
    image: require("./2682822_forecast_rainbow_spectr_weather_icon.png")
}



