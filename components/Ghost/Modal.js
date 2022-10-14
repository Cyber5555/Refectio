import React, { Component } from "react"
import { StyleSheet, SafeAreaView, View, Image, Text, Modal, TouchableOpacity } from "react-native";


import BlueButton from "../Component/Buttons/BlueButton";
import Svg, { Path, Rect } from "react-native-svg";



export default class ModalComponent extends Component {
  constructor(props) {
    super(props)
  }

  goToLogin = () => {
    this.props.navigation.navigate('Login')
  }

  goToRegistered = () => {
    this.props.navigation.navigate('RegisteredScreen')
  }



  render() {
    return (
      <View style={styles.logInOrSignUp}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('GhostPage')
          }}
          style={{
            position: 'absolute',
            top: 32,
            right: 15,
          }}>
          <Svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M17.4991 17.7805L9.14094 9.35911M9.0777 26.1386L17.4991 17.7805L9.0777 26.1386ZM17.4991 17.7805L25.9204 9.42235L17.4991 17.7805ZM17.4991 17.7805L25.8572 26.2019L17.4991 17.7805Z" stroke="black" stroke-width="2" stroke-linecap="round" />
          </Svg>

        </TouchableOpacity>
        <Image
          source={require('../../assets/image/RefectioWallpaper.png')}
          style={{
            width: '95%',
            position: 'absolute',
            top: '-15%',
            right: 0,
            zIndex: -1,
            resizeMode: 'contain',
          }} />
        <Text style={{ textAlign: 'center', fontSize: 24, fontFamily: 'Poppins_500Medium', color: '#2D9EFB', marginTop: '55%', }}>
          Войдите{'\n'}в существующий аккаунт{'\n'}или зарегистрируйтесь
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 115
          }}
          onPress={() => this.goToLogin()}>
          <BlueButton name='Войти' />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 21
          }}
          onPress={() => this.goToRegistered()}>
          <BlueButton name='Зарегистрироваться' />
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  logInOrSignUp: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff'
  }
})