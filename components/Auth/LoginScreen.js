import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { SafeAreaView, View, Image, Text, StyleSheet, TouchableOpacity, TextInput, Modal, ImageBackground } from "react-native";
import ArrowGrayComponent from "../../assets/image/ArrowGray"
import BlueButton from "../Component/Buttons/BlueButton";

import { AuthContext } from '../AuthContext/context';
import MaskInput from "react-native-mask-input";


export default class LoginScreenComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: true,
      pass: '',
      pass_error: false,

      login: '',
      login_error: false,
      no_user: false,
      no_verify: false,

      achq: require('../../assets/image/achq.png'),
      achqBac: require('../../assets/image/achq-bac.png'),

      moderacia: false,
      sendToken: null,
    }
  }

  static contextType = AuthContext;

  goToForgetPassword = () => {
    this.props.navigation.navigate('ForgetPassword')
  }
  goToAuthScreen = () => {
    this.props.navigation.navigate('AuthScreen')
  }

  setStorage = async (userToken) => {
    await AsyncStorage.setItem('userToken', userToken)
  }

  sendLoginData = async () => {
    fetch('http://80.78.246.59/Refectio/public/api/loginuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: this.state.login,
        password: this.state.pass
      })
    })
      .then(response => response.json())
      .then(res => {
        console.log(res, 'login data')
        let userToken = res.message.token
        console.log(res.message.token, 'id')




        if (res.status == false) {
          if (res.message.message == 'user does not exist') {
            this.setState({
              no_user: true
            })
          } else {
            this.setState({
              no_user: false
            })
          }

          if (res.message.message == 'wrong password') {
            this.setState({
              pass_error: true
            })
          } else {
            this.setState({
              pass_error: false
            })
          }
          if (res.message == 'User@   heraxosahamari hastatum chi ancel Levon jan') {
            this.setState({
              no_verify: true
            })
          } else {
            this.setState({
              no_verify: false
            })
          }

        }
        else {
          if (res.message.user.active == '2') {
            let foundUser = {
              userToken: userToken,
              userRole: res.message.role_id
            }
            this.context.signIn(foundUser);
          }
          else if (res.message.user.active == '1') {
            this.setState({ moderacia: true })
          }
        }
      })
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, }}>
        <View style={{ flex: 1, backgroundColor: 'white', position: 'relative', alignItems: 'center' }}>

          <Modal visible={this.state.moderacia}>
            <ImageBackground
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={require('../../assets/image/blurBg.png')}
            >
              <View
                style={{
                  width: '90%',
                  height: '50%',
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  position: 'relative',
                  paddingHorizontal: 15,
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 18,
                    top: 18,
                  }}
                  onPress={() => this.setState({ moderacia: false })}>
                  <Image
                    source={require('../../assets/image/ixs.png')}
                    style={{
                      width: 22.5,
                      height: 22.5,
                    }}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    marginTop: 70,
                    fontSize: 26,
                    textAlign: 'center',
                    color: '#2D9EFB',
                    fontFamily: 'Poppins_500Medium',
                  }}>
                  ?????? ??????????????{'\n'}???? ??????????????????
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins_400Regular',
                    fontSize: 14,
                    textAlign: 'center',
                    marginTop: 20,
                    color: '#888888'
                  }}>
                  ???????????? ?????? ?????????????? ??????????????????{'\n'}????????????????
                </Text>
                <TouchableOpacity
                  style={{
                    marginTop: 80
                  }}
                  onPress={() => this.setState({ moderacia: false })}>
                  <BlueButton name="??????????????" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Modal>



          <TouchableOpacity
            onPress={() => this.goToAuthScreen()}
            style={{
              position: 'absolute',
              left: 10,
              top: 23,
              zIndex: 100
            }}>
            <ArrowGrayComponent />
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              height: 130,
            }}></View>

          <Image
            source={require('../../assets/image/RefectioWallpaper.png')}
            style={{
              width: '95%',
              height: 135,
              resizeMode: 'center',
              position: 'absolute',
              right: 0,
              top: 23,
            }}
          />

          <Text style={styles.vxod}>????????</Text>

          <View style={{ width: "85%", marginBottom: 15 }}>
            <Text style={[styles.fiealdset, { marginTop: 27, }, this.state.login_error || this.state.no_user || this.state.no_verify ? { color: 'red' } : { color: '#5B5B5B' }]}>
              {
                this.state.no_user ? '???? ???????????? ???????????? ???????????????? ???????????????????????? ???? ??????????????????????????????'
                  :
                  this.state.no_verify ? '???? ???????????? ???????????? ???? ?????????????? ?? ???? ???????? ??????????????'
                    :
                    '?????????? ????????????????'
              }
            </Text>
            <MaskInput
              underlineColorAndroid="transparent"
              keyboardType="phone-pad"
              placeholder="+7 (975) 991-99-99"
              style={[{ borderWidth: 1, padding: 10, width: '100%', borderRadius: 5, },
              this.state.login_error || this.state.no_user ? { borderColor: 'red' } : { borderColor: '#F5F5F5' }]}
              value={this.state.login}
              onChangeText={(text, unmasked, obfuscated) => {
                this.setState({ login: text })
                console.log(text);
              }}
              mask={['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/,]}
            />
          </View>

          <View style={{ position: 'relative', width: "85%", }}>
            <Text style={[styles.fiealdset, { marginTop: 15, }, this.state.pass_error ? { color: 'red' } : { color: '#5B5B5B' }]}>
              {this.state.pass_error ? '?????????????????????? ???????????? ????????????' : '????????????'}
            </Text>
            <TextInput
              underlineColorAndroid="transparent"
              secureTextEntry={this.state.password}
              style={[styles.input, this.state.pass_error ? { borderColor: 'red' } : { borderColor: '#F5F5F5' }]}
              value={this.state.pass}
              onChangeText={(text) => this.setState({ pass: text })}
            />
            <TouchableOpacity style={{ position: 'absolute', right: 10, bottom: 10, }}
              onPress={() => this.setState({ password: !this.state.password })} >
              {this.state.password &&
                <Image source={this.state.achq} style={{ width: 24, height: 24, }} />

              }
              {!this.state.password &&
                <Image source={this.state.achqBac} style={{ width: 24, height: 24, }} />
              }
            </TouchableOpacity>

          </View>

          <TouchableOpacity
            style={{ justifyContent: 'center', width: '100%', alignItems: 'center', marginTop: 113 }}
            onPress={() => {
              if (this.state.login !== '' && this.state.pass !== '') {
                this.sendLoginData()
              }
              else {
                if (this.state.pass == '') {
                  this.setState({
                    pass_error: true
                  })
                } else {
                  this.setState({
                    pass_error: false
                  })
                }
                if (this.state.login == '') {
                  this.setState({
                    login_error: true
                  })
                } else {
                  this.setState({
                    login_error: false
                  })
                }
              }
            }}
          >
            <BlueButton
              name="??????????"
            />
          </TouchableOpacity>

          <View style={{ justifyContent: 'center', width: '100%', flexDirection: 'row', marginTop: 18 }}>
            <TouchableOpacity
              onPress={() => { this.goToForgetPassword() }}>
              <Text style={{ fontFamily: 'Poppins_500Medium', lineHeight: 23, fontSize: 15, color: '#888888', }} >
                ???????????? ?????????????
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}



const styles = StyleSheet.create({
  logo: {
    width: '93.5%',
    height: 125,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginTop: 23,
  },
  vxod: {
    width: "100%",
    textAlign: 'center',
    fontFamily: 'Poppins_500Medium',
    lineHeight: 54,
    fontSize: 32,
    color: '#2D9EFB',
    marginTop: 10

  },
  fiealdset: {
    fontFamily: 'Poppins_500Medium',
    lineHeight: 23,
    fontSize: 15,
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderRadius: 5,
  }
})