import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'; // Adicionado View e StyleSheet
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/MainStyle';

export default function LoginDs({ navigation }) {
  
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const entrar = () => {
    navigation.reset({
      index:0,
      routes: [{name:"Principal"}]
    })
  };

  const cadastrar = () => {
    navigation.navigate("Cadastro")
  };

    
  return (
    <View style={[styles.container, specificStyle.specificContainer]}>
      <Text h3>Entrar no App</Text>
      <Input 
        placeholder='E-mail'
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        onChangeText={value => setEmail(value)}
        keyboardType='email-address'
      />
      <Input 
        placeholder='Digite a senha'
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        onChangeText={value => setPassword(value)}
        secureTextEntry={true}
      />
      <Button
        icon={
          <Icon 
            name="check"
            size={15}
            color="white"
          />
        }
        title=" Entrar"
        buttonStyle={specificStyle.button}
        onPress={() =>entrar()}
      />


      <Button
        icon={
          <Icon 
            name="user"
            size={15}
            color="white"
          />
        }
        title=" Cadastrar"
        buttonStyle={specificStyle.button}
        onPress={() => cadastrar()}
      />
    </View>
  );
}

const specificStyle = StyleSheet.create({
  specificContainer: {
    backgroundColor: '#fff'
  },
    button:{ 
      width: "100%",
    marginTop: 10
  }
});