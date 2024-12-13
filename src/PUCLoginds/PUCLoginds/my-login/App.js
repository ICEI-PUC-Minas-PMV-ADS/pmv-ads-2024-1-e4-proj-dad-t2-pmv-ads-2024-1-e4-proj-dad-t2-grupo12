import React, { useState } from 'react';
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginDs from './screens/LoginDs';
import Principal from './screens/Principal';
import Cadastro from './screens/Cadastro';


const Stack = createStackNavigator();

function MyStack( ){
  return(
    <Stack.Navigator>
        <Stack.Screen name= "LoginDs" component={LoginDs} />
        <Stack.Screen name= "Principal" component={Principal} />
        <Stack.Screen name= "Cadastro" component={Cadastro} />

    </Stack.Navigator>
  );
}

export default function App(){
  return(
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}


