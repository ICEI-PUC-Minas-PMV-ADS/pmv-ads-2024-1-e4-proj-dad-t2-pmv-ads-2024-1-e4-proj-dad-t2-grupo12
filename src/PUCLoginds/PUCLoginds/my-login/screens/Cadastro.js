import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'; // Adicionado View e StyleSheet
import { Button, CheckBox, Input, Text } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/MainStyle';

export default function Cadastro({navigation}) {
  
  const [email, setEmail] = useState(null);
  const [nome, setNome] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [isSelected, setSelected] = useState(false);
  const [errorEmail, setErroEmail] = useState(null);
  const [errorNome, setErroNome] = useState(null);
  const [errorCpf, setErroCpf] = useState(null);
  const [errorTelefone, setErroTelefone] = useState(null);

  let cpfField = null
  let telefoneField = null


  const validar = () =>{
    let erro = false
    setErroEmail(null)
    setErroCpf(null)
    const re = /\S+@\S+\.\S+/

    if (!re.test(email)){
        setErroEmail("Preencher e-mail correto")
        erro = true
    }
    if (!cpfField.isValid()){
        setErroCpf("Preencher CPF correto.")
        erro = true
    }
    if (telefone == null){
        setErroTelefone("Preencher telefone correto.")
        erro = true
    } 
    return !erro
  }

  const salvar = () => {
    if(validar()){
        console.log("Salvou!")
    }
  }

  
  return (
    <View style={[styles.container, specificStyle.specificContainer]}>
      <Text h3>Cadastre-se! </Text>
      <Input 
        placeholder='E-mail'
        onChangeText={value => {
             setEmail(value)
             setErroEmail(null)
            }}
        keyboardType='email-address'
        errorMessage={errorEmail}
      />

      <Input 
        placeholder='Nome'
        onChangeText={value => setNome(value)}
        errorMessage={errorNome}
      />

      <View style={styles.containerMask}> 
      <TextInputMask
        placeholder="CPF"
        type={'cpf'}
        value={cpf}
        onChangeText={value => {
          setCpf(value)
          setErroCpf(null)
         }}
        keyboardType='number-pad'
        returnKeyType='done'
        style={styles.maskedInput}
        ref={(ref) => cpfField = ref}
      />
      </View> 
      <Text style={styles.errorMessage}>{errorCpf}</Text>

      <View style={styles.containerMask}> 
      <TextInputMask
        placeholder="Telefone"
        type={'cel-phone'}
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) '
        }}
        value={telefone}
        onChangeText={value => setTelefone(value)}
        keyboardType='phone-pad'
        returnKeyType='done'
        style={styles.maskedInput}
        ref={(ref) => telefoneField = ref}
      />
      </View> 
      <Text style={styles.errorMessage}>{errorTelefone}</Text>
      
    <CheckBox
        title="Aceito do termo de uso"
        checkedIcon="check"
        uncheckedIcon="square-o"
        checkedColor='green'
        uncheckedColor='red'
        checked={isSelected}
        onPress={()=>setSelected(!isSelected)}
    /> 
      
      <Button
        icon={
          <Icon 
            name="user"
            size={15}
            color="white"
          />
        }
        title=" Salvar"
        buttonStyle={specificStyle.button}
        onPress={() => salvar()}
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