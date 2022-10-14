import React, { Component } from "react";
import { SafeAreaView, View, Text, Touchable, TouchableOpacity, TextInput, ScrollView, StyleSheet, Modal } from "react-native";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
import BlueButton from "../Component/Buttons/BlueButton";

export default class ForgetPasswordComponent extends Component {
  constructor(props) {
    super(props)

  }



  goToForgetPasswordTel = () => {
    this.props.navigation.navigate('ForgetPasswordTel');
  }

  goToLogin = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <SafeAreaView
        style={{ backgroundColor: 'white', flex: 1, }}
      >
        <View style={{ flex: 1, paddingHorizontal: 25 }}>
          <View
            style={{
              width: 360,
              height: 152,
              resizeMode: 'contain',
              position: 'absolute',
            }}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: 15,
                top: 40,
              }}
              onPress={() => this.goToLogin()}>
              <ArrowGrayComponent />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              marginTop: 102,
              fontSize: 26,
              fontFamily: 'Poppins_500Medium',
              color: '#2D9EFB',
            }}>
            Восстановление{'\n'}аккаунта
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Poppins_400Regular',
              color: '#52A8EF',
              marginTop: 25
            }}>
            Мы отправим 4-х значный код на ваш номер{'\n'}для подтверждения личности
          </Text>
          <View>
            <Text
              style={{
                fontFamily: 'Poppins_500Medium',
                lineHeight: 23,
                fontSize: 15,
                color: '#5B5B5B',
                marginTop: 27,
                marginBottom: 5,
                marginTop: 52
              }}
            >
              Номер телефона
            </Text>

            <TextInput
              underlineColorAndroid="transparent"
              keyboardType="phone-pad"
              style={{
                borderWidth: 1,
                borderColor: '#F5F5F5',
                padding: 10,
                width: '100%',
                borderRadius: 5,
              }}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: 67
            }}>
            <TouchableOpacity
              onPress={() => { this.goToForgetPasswordTel() }}>
              <BlueButton name='Отправить код' />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

